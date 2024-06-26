import Header from "@/BasicComponents/header";
import { Outlet } from "react-router-dom";

function Layout1() {
  return (
    <div className="w-full bg-[#1A1A1B] px-5 h-full">
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout1;
