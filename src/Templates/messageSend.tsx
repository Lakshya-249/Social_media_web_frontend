import { getDetails, getImage } from "@/utils/auth";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {
  faGear,
  faPaperPlane,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const url = import.meta.env.VITE_BACKEND_URL;

function MessageSend() {
  const [search] = useSearchParams();
  const roomid = search.get("id");
  type userdetail = {
    id: string;
    content: string;
    createdAt: string;
    user: {
      id: string;
      name: string;
      image: string;
    };
  };
  const [message, setmessage] = useState<string>("");
  let now = new Date();
  let currentTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  function convertTo12Hour(isoString: string) {
    const date = new Date(isoString);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  }
  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch(`${url}/getmessages?roomid=${roomid}`);
      const data = await response.json();
      setuser(data);
    };
    fetchdata();
  }, [search]);

  const [user, setuser] = useState<userdetail[]>([]);
  const adduser = async (message: string) => {
    if (message.trim() === "") return;
    const newuser: userdetail = {
      id: "",
      user: {
        name: getDetails("username") || "User",
        id: getDetails("id") || "abcd",
        image: "none",
      },
      content: message,
      createdAt: currentTime,
    };

    const response = await fetch(`${url}/sendmessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, roomid, userid: newuser.user.id }),
    });
    const data = await response.json();
    newuser.id = data.data.id;
    // console.log(data);

    setuser([...user, newuser]);
    setmessage("");
  };
  const removeMessage = async (rid: string) => {
    const response = await fetch(`${url}/deletemessage/${rid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    const newarr: userdetail[] = user.filter((use) => use.id !== rid);
    setuser(newarr);
  };
  return (
    <div className="w-full h-full text-left flex flex-col justify-between">
      <div className="w-full flex justify-between font-semibold p-3.5 text-left border-b-[0.15px] border-gray-500">
        <p>{search.get("name")}</p>
        <Sheet>
          <SheetTrigger>
            <FontAwesomeIcon icon={faGear} />
          </SheetTrigger>
          <SheetContent className="max-sm:w-full text-left">
            <SheetHeader>
              <SheetTitle>Channel Settings</SheetTitle>
              <SheetDescription>
                Make changes to your channel settings
              </SheetDescription>
            </SheetHeader>
            <div className="w-full flex flex-col font-semibold items-center my-5 p-5">
              <div className="space-y-3">
                <div className="w-[5rem] h-[5rem] text-white text-5xl flex justify-center items-center overflow-hidden rounded-full bg-[#101111]">
                  {getImage()?.toLowerCase() !== "none" ? (
                    <img src={getImage() || ""} alt="..." />
                  ) : (
                    <p>{search.get("name")?.[0].toUpperCase()}</p>
                  )}
                </div>
                <p className="text-sky-400">{search.get("name")}</p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="w-full h-full flex overflow-hidden items-end">
        <div className="w-full max-h-full cont overflow-auto">
          {user.map((val, i) => (
            <div
              key={i}
              className="relative group p-5 flex space-x-2.5 hover:bg-[#101111]"
            >
              <div>
                <div className="w-[1.8rem] h-[1.8rem] flex justify-center items-center rounded-full bg-[#353636]">
                  {val.user.image !== "none" ? (
                    <img src={val.user.image} alt="L" />
                  ) : (
                    <p>{val.user.name[0].toUpperCase()}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-between w-full text-sm">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-bold">{val.user.name}</p>
                    <p className="text-xs text-gray-400">
                      {val.createdAt.includes("T")
                        ? convertTo12Hour(val.createdAt)
                        : val.createdAt}
                    </p>
                  </div>
                  <p className="font-light">{val.content}</p>
                </div>
              </div>
              <div className="absolute p-5 hidden group-hover:block right-0 top-0">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="hover:cursor-pointer"
                    />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => removeMessage(val.id)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex items-center py-2 px-4 space-x-4 ">
        <div className="w-full px-4 py-2 rounded-full flex justify-between items-center border-b-[0.15px] bg-[#292a2a]">
          <input
            type="text"
            className="bg-inherit w-full outline-none"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setmessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") adduser(message);
              else return;
            }}
          />
          <FontAwesomeIcon icon={faPaperclip} color="gray" />
        </div>
        <FontAwesomeIcon
          icon={faPaperPlane}
          size="xl"
          onClick={() => adduser(message)}
          className="hover:cursor-pointer"
        />
      </div>
    </div>
  );
}

export default MessageSend;
