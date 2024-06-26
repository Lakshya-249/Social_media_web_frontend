import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Creategroupchannel() {
  return (
    <div className="w-full h-full flex flex-col space-y-20">
      <div className="w-full font-semibold p-3 text-left border-b-[0.15px] border-gray-500">
        Create chat
      </div>
      <div className="flex justify-center">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="bg-[#101111] space-x-5">
            <TabsTrigger value="account">Chat Room</TabsTrigger>
            <TabsTrigger value="password">Private Room</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="w-[25rem] h-auto text-left space-y-5 p-5 mx-auto rounded-2xl border-[1px] border-white">
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
            <div className="w-[25rem] h-auto text-left space-y-5 p-5 mx-auto rounded-2xl border-[1px] border-white">
              <p>Create a private room</p>
              <input
                type="text"
                className="p-4 rounded-3xl bg-[#292a2a] w-full"
                placeholder="Enter the username"
              />
              <div className="max-h-[10rem] space-y-3">
                <div className="w-full flex space-x-2">
                  <div className="w-[2rem] h-[2rem] "></div>
                </div>
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
