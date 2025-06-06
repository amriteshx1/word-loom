import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { BellRing } from "../components/bellring";
import { User } from "../components/profile";
import write from "../assets/write.png";

export default function Layout() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/");
    }
  };

  const handleWrite = () => {
    const adminAlert = window.confirm(
      "Switching to the admin side in a new tab.\nYou may need to log in again - just to keep things safe! 💫"
    );

    if (adminAlert) {
      window.open("http://localhost:5174", "_blank");
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="main-container flex-col pr-[10vh] pl-[10vh] overflow-y-scroll">
      <div className="h-[9vh] w-full flex justify-between items-center bg-neutral-700 text-zinc-100 p-[2vh] rounded-b-4xl">
        <div className="w-[50%] flex justify-start items-center gap-[3vw]">
          <p onClick={() => navigate("/feed")} className="text-[1.7vw] font-medium hover:cursor-pointer">Wordloom.</p>
          <input
            type="text"
            className="h-[4vh] w-[50%] bg-white rounded-2xl text-neutral-700 p-[1.5vh] border-2 border-neutral-700 text-[1vw] font-normal"
            placeholder="Search blogs...."
          />
        </div>

        <div className="w-[50%] flex justify-end items-center gap-[2vw]">
          <div className="w-auto flex justify-center items-center gap-1">
            <img src={write} alt="write-blog-logo" className="h-[2.8vh]" />
            <button
              onClick={handleWrite}
              className="text-[1.1vw] text-white font-medium hover:text-neutral-200 cursor-pointer"
            >
              Write
            </button>
          </div>

          <BellRing style={{ height: "2.7vh" }} />
          <div className="relative flex flex-col text-left" ref={menuRef}>
            <div onClick={() => setOpen(!open)} className="cursor-pointer">
              <User style={{ height: "3vh" }} />
            </div>

            {open && (
              <div className="absolute h-[12vh] right-0 flex flex-col justify-center items-center mt-[5vh] mr-[1.5vh] w-[10vw] bg-white border border-gray-300 rounded-tl-4xl  rounded-br-4xl shadow-lg z-50">
                <button
                  className=" h-[50%] w-full px-6 py-2 text-left text-gray-700 rounded-tl-4xl cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    handleWrite();
                    setOpen(false);
                  }}
                >
                  Admin Portal
                </button>
                <button
                  className=" h-[50%] w-full px-6 py-2 text-left text-red-600  rounded-br-4xl cursor-pointer hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      
      <Outlet />
    </div>
  );
}
