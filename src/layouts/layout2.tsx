import MessagesearchTemp from "@/Templates/messagesearchTemp";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function Layout2() {
  const win = window.matchMedia("(max-width: 640px)");
  let location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!win.matches && location.pathname === "/message/search") {
      navigate("/message");
      console.log(location);
    }
  }, [location]);
  if (win.matches) {
    return (
      <div className="w-full h-full flex bg-black">
        <Outlet />
      </div>
    );
  }
  return (
    <div className="w-full h-full flex bg-black">
      <div className="w-[25%] h-full">
        <MessagesearchTemp />
      </div>

      <div className="w-[75%] max-sm:w-full h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout2;
