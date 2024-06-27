import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

function Creategroupchannel() {
  type userdetail = {
    name: string;
    image: string;
  };

  const [user, setuser] = useState<userdetail[]>([]);
  const [user2, setuser2] = useState<userdetail[]>([]);
  const [visible, setvisible] = useState<boolean>(false);

  useEffect(() => {
    console.log(user2);

    if (user2.length > 1) {
      setvisible(true);
    } else setvisible(false);
  }, [user2]);

  const adduser = (i: number) => {
    const name = user[i].name;
    const image = user[i].image;
    setuser2([...user2, { name: name, image: image }]);
    user.splice(i, 1);
    setuser([...user]);
  };
  const removeuser = (i: number) => {
    const name = user2[i].name;
    const image = user2[i].image;
    setuser([...user, { name: name, image: image }]);
    user2.splice(i, 1);
    setuser2([...user2]);
  };
  return (
    <div className="w-full h-full flex flex-col space-y-20">
      <div className="w-full font-semibold p-3.5 text-left border-b-[0.15px] border-gray-500">
        Create chat
      </div>
      <div className="flex justify-center px-4">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="bg-[#101111] space-x-5">
            <TabsTrigger value="account">Chat Room</TabsTrigger>
            <TabsTrigger value="password">Private Room</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="w-[26rem] max-sm:w-full h-auto text-left space-y-5 p-5 mx-auto rounded-2xl border-[1px] border-white">
              <p>Create a public chat room</p>
              <input
                type="text"
                className="p-5 rounded-3xl bg-[#292a2a] w-full"
                placeholder="Choose Name for your chat room"
              />
              <textarea
                className="p-5 cont h-[7rem] resize-none rounded-3xl bg-[#292a2a] w-full"
                placeholder="Write a decription for your chat room"
              />
              <div className="w-full flex justify-end space-x-5">
                <button className="px-7 py-2 border-[1px] border-gray-500 hover:bg-[#171717] rounded-xl">
                  Cancel
                </button>
                <button className="px-7 py-2 font-semibold text-black bg-white hover:opacity-90 rounded-xl">
                  Create
                </button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="password">
            <div className="w-[26rem] max-sm:w-full h-auto text-left space-y-5 p-5 mx-auto rounded-2xl border-[1px] border-white">
              <p>Create a private room</p>
              {visible ? (
                <input
                  type="text"
                  className="px-5 py-3.5 rounded-3xl bg-[#292a2a] w-full"
                  placeholder="Group Name *"
                />
              ) : (
                ""
              )}
              <div className="px-5 p-4 space-y-1 rounded-3xl outline outline-1 bg-[#292a2a] w-full">
                <input
                  type="text"
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
                <button className="px-7 py-2 border-[1px] border-gray-500 hover:bg-[#171717] rounded-xl">
                  Cancel
                </button>
                <button className="px-7 py-2 font-semibold text-black bg-white hover:opacity-90 rounded-xl">
                  Create
                </button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Creategroupchannel;
