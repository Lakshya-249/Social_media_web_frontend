import { Outlet } from "react-router-dom";

function Messagetemplate() {
  return (
    <div className="w-[75%]">
      <Outlet />
    </div>
  );
}

export default Messagetemplate;
