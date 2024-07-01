import { faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { getDetails, setImage } from "@/utils/auth";

const url = import.meta.env.VITE_BACKEND_URL;

function MessagesearchTemp() {
  type user = {
    name: string;
    comment: string;
    time: string;
    id: string;
    roomid: string;
    image: string;
  };
  const [muser, setmuser] = useState<user[]>([]);
  const [show, setshow] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setshow(true);
    const getuser = async () => {
      const response = await fetch(
        url + "/getroomsfromUser/" + getDetails("id")
      );
      const data = await response.json();
      console.log(data);

      setmuser(data);
    };
    getuser();
    setshow(false);
  }, []);

  return (
    <div className="w-full flex flex-col text-left h-full border-gray-500 border-r-[0.15px]">
      <div className="p-5 flex justify-between items-center pb-5 border-b-[0.15px] border-gray-500">
        <p className="text-xl font-bold">Chats</p>
        <FontAwesomeIcon
          icon={faPlus}
          onClick={() => navigate("/message/createroom")}
          className="p-2.5 rounded-full hover:cursor-pointer hover:bg-[#353636]"
        />
      </div>
      <div className="overflow-auto cont">
        <div className="p-5 flex justify-between hover:cursor-pointer items-center hover:bg-[#101111]">
          <p>Discover channels</p>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        {muser.map((val, i) => (
          <div
            key={i}
            onClick={() => {
              setImage(val.image);
              navigate(`/message/send?id=${val.roomid}&name=${val.name}`);
            }}
            className="p-5 flex space-x-2 hover:cursor-pointer items-center hover:bg-[#101111]"
          >
            <div>
              <div className="w-[2.5rem] h-[2.5rem] flex justify-center overflow-hidden items-center rounded-full bg-[#353636]">
                {val.image !== "none" ? (
                  <img src={val.image} alt="L" />
                ) : (
                  <FontAwesomeIcon icon={faUser} />
                )}
              </div>
            </div>
            <div className="flex justify-between w-full text-sm">
              <div>
                <p>{val.name}</p>
                <p className="text-xs text-gray-500">{val.comment}</p>
              </div>
              <p className="text-xs text-gray-400">{val.time}</p>
            </div>
          </div>
        ))}
        {show ? (
          <div className="flex items-center p-5 space-x-4">
            <Skeleton className="h-12 w-12 bg-[#353636] rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 bg-[#353636] w-[250px]" />
              <Skeleton className="h-4 bg-[#353636] w-[200px]" />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default MessagesearchTemp;
