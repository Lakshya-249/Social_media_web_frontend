import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDetails } from "@/utils/auth";
import {
  faArrowLeft,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const url = import.meta.env.VITE_BACKEND_URL;

function Creategroupchannel() {
  const navigate = useNavigate();
  type userdetail = {
    name: string;
    image: string;
    id: string;
  };

  type roomdetail = { name: string; userid: string; remark: string };

  const [rooms, setrooms] = useState<roomdetail>({
    name: "",
    userid: getDetails("id") || "user",
    remark: "",
  });
  const [user, setuser] = useState<userdetail[]>([]);
  const [user2, setuser2] = useState<userdetail[]>([]);
  const [visible, setvisible] = useState<boolean>(false);
  const [show, setshow] = useState<boolean>(false);
  const [name, setname] = useState<string>("");

  useEffect(() => {
    console.log(user2);

    if (user2.length > 1) {
      setvisible(true);
    } else setvisible(false);
  }, [user2]);

  const adduser = (i: number) => {
    const name = user[i].name;
    const image = user[i].image;
    const id = user[i].id;
    setuser2([...user2, { name: name, image: image, id: id }]);
    user.splice(i, 1);
    setuser([...user]);
  };
  const removeuser = (i: number) => {
    const name = user2[i].name;
    const image = user2[i].image;
    const id = user2[i].id;
    setuser([...user, { name: name, image: image, id: id }]);
    user2.splice(i, 1);
    setuser2([...user2]);
  };
  const debounce = (cb: (word: any) => void, delay: number = 1000) => {
    return (...args: [string]) => {
      setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };

  const handleupdate = debounce(async (text) => {
    const url2 = url + "/getusers?name=" + text;
    const response = await fetch(url2);
    const data = await response.json();
    console.log(data);
    if (data.message) {
      setuser([]);
      return;
    }
    const newdata: userdetail[] = data.filter((val: any) => {
      let flag = false;
      for (let dat in user2) {
        if (user2[dat].id === val.id) {
          flag = true;
          break;
        } else flag = false;
      }
      if (getDetails("id") === val.id) flag = true;
      if (!flag) return val;
    });
    console.log(newdata);

    setuser(newdata);
    // console.log(text);
  });
  const handleSubmit = async () => {
    if (rooms.name.trim() === "") {
      setshow(true);
      return;
    }
    const newroom: roomdetail = rooms;
    setrooms({ ...rooms, name: "", remark: "" });
    const response = await fetch(url + "/createroom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newroom),
    });
    const data = await response.json();
    console.log(data);
    navigate(`/message/send?id=${data.id}`);
  };
  const handleSubmit2 = async () => {
    const url2 = url + "/creategroup";
    if (user2.length > 1) {
      if (name.trim() === "") {
        setshow(true);
        return;
      }
      const name2 = name;
      setname("");
      const newuser: userdetail[] = user2;
      setuser2([]);
      setuser([]);
      const response = await fetch(url2, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name2,
          groupmembers: [
            ...newuser,
            { name: getDetails("username"), image: "", id: getDetails("id") },
          ],
        }),
      });
      const data = await response.json();
      // console.log(data);
      navigate(`/message/send?id=${data.id}`);
    } else if (user2.length === 1) {
      const newuser: userdetail = user2[0];
      setuser2([]);
      setuser([]);
      const response = await fetch(url + "/createprivateroom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user1: newuser.id,
          user2: getDetails("id"),
          name: "Proom2",
        }),
      });
      const data = await response.json();
      // console.log(data);
      navigate(`/message/send?id=${data.id}`);
    } else {
      return;
    }
  };
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="w-full font-semibold p-3.5 text-left border-b-[0.15px] border-gray-500">
        Create chat
      </div>
      <div className="flex h-full py-10 justify-center px-4">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="bg-[#101111] space-x-5">
            <TabsTrigger value="account">Chat Room</TabsTrigger>
            <TabsTrigger value="password">Private Room</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="w-[26rem] max-sm:w-full text-left space-y-5 p-5 rounded-2xl border-[1px] border-white">
              <p>Create a public chat room</p>
              <input
                type="text"
                value={rooms.name}
                onChange={(e) => setrooms({ ...rooms, name: e.target.value })}
                className="p-5 rounded-3xl bg-[#292a2a] w-full"
                placeholder="Choose Name for your chat room"
              />
              {show ? (
                <p className="text-red-400">
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                  {"  "}
                  Name field cannot be left blank...
                </p>
              ) : (
                ""
              )}
              <textarea
                value={rooms.remark}
                onChange={(e) => setrooms({ ...rooms, remark: e.target.value })}
                className="p-5 cont h-[7rem] resize-none rounded-3xl bg-[#292a2a] w-full"
                placeholder="Write a decription for your chat room"
              />
              <div className="w-full flex justify-end space-x-5">
                <button
                  onClick={() => navigate("/message")}
                  className="px-7 py-2 border-[1px] border-gray-500 hover:bg-[#171717] rounded-xl"
                >
                  Cancel
                </button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="px-7 py-2 font-semibold text-black bg-white hover:opacity-90 rounded-xl">
                      Create
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Do you want to create a new chat channel.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleSubmit}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="password">
            <div className="w-[26rem] max-sm:w-full h-auto text-left space-y-5 p-5 rounded-2xl border-[1px] border-white">
              <p>Create a private room</p>
              {visible ? (
                <input
                  value={name}
                  type="text"
                  onChange={(e) => setname(e.target.value)}
                  className="px-5 py-3.5 rounded-3xl bg-[#292a2a] w-full"
                  placeholder="Group Name *"
                />
              ) : (
                ""
              )}
              {show ? (
                <p className="text-red-400">
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                  {"  "}
                  Name field cannot be left blank...
                </p>
              ) : (
                ""
              )}
              <div className="px-5 p-4 space-y-1 rounded-3xl outline outline-1 bg-[#292a2a] w-full">
                <input
                  type="text"
                  onChange={(e) => handleupdate(e.target.value)}
                  className="w-full bg-inherit outline-none"
                  placeholder="Enter the username*"
                />

                <div className="flex flex-wrap">
                  {user2.map((val, i) => (
                    <div
                      key={i}
                      onClick={() => removeuser(i)}
                      className="rounded-full flex p-1.5 hover:cursor-pointer flex-wrap font-semibold m-1 space-x-2 text-xs bg-black"
                    >
                      <div className="w-[1rem] h-[1rem] rounded-full bg-[#434444]"></div>
                      <p>{val.name}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="max-h-[10rem] cont overflow-auto space-y-3">
                {user.map((val, i) => (
                  <div
                    onClick={() => adduser(i)}
                    key={i}
                    className="w-full hover:cursor-pointer py-1.5 rounded-xl bg-[#292a2a] px-5 items-center text-sm flex space-x-2"
                  >
                    <div className="w-[1.7rem] h-[1.7rem] rounded-full bg-[#171717]"></div>
                    <p>{val.name}</p>
                  </div>
                ))}
              </div>
              <div className="w-full flex space-x-5 justify-end">
                <button
                  onClick={() => navigate("/message")}
                  className="px-7 py-2 border-[1px] border-gray-500 hover:bg-[#171717] rounded-xl"
                >
                  Cancel
                </button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="px-7 py-2 font-semibold text-black bg-white hover:opacity-90 rounded-xl">
                      Create
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Do you want to create a new group
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleSubmit2}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-full">
        <div
          className="w-[3.5rem] h-[3.5rem] m-5 flex justify-center items-center 
          rounded-full bg-[#303131] hover:bg-[#2c2a2a] hover:cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowLeft} size="xl" />
        </div>
      </div>
    </div>
  );
}

export default Creategroupchannel;
