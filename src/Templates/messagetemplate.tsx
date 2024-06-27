import { Outlet } from "react-router-dom";

function Messagetemplate() {
  return (
    <div className="w-[75%] max-sm:w-full h-full">
      <Outlet />
    </div>
  );
}

export default Messagetemplate;
