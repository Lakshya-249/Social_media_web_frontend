import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const handlemessage = () => {
    const win = window.matchMedia("(max-width: 640px)");
    if (win.matches) navigate("/message/search");
    else navigate("/message");
  };
  return (
    <div className="bg-inherit flex justify-between items-center border-b-[0.15px] border-gray-500 font-sans text-sm w-full h-[4rem]">
      <div className="text-3xl font-bold font-serif">Chatapp</div>
      <div className="px-5 p-3 flex items-center rounded-full bg-[#1a2228] hover:cursor-pointer hover:bg-[#3f3d3d] space-x-3">
        <FontAwesomeIcon icon={faSearch} color="white" />
        <input
          type="text"
          className="bg-inherit outline-none w-[30rem]"
          placeholder="Seach something"
        />
      </div>
      <div className="flex items-center space-x-4 ">
        <div className="p-3 rounded-full hover:bg-[#3f3d3d]">
          <FontAwesomeIcon
            onClick={handlemessage}
            icon={faCommentDots}
            size="xl"
          />
        </div>
        <div className="flex items-center font-semibold p-3 rounded-full hover:bg-[#3f3d3d] space-x-2">
          <FontAwesomeIcon icon={faPlus} size="xl" />
          <div>Create</div>
        </div>
        <div className="w-[2rem] h-[2rem] bg-[#3f3d3d] rounded-full"></div>
      </div>
    </div>
  );
}

export default Header;
