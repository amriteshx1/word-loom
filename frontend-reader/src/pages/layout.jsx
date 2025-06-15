import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { BellRing } from "../components/bellring";
import { User } from "../components/profile";
import write from "../assets/write.png";
import appWrite from "../assets/appWrite.png";
import { toast } from 'react-hot-toast';

export default function Layout() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      toast.success("Logged out successfully.");
      navigate("/");
    }
  };

  const handleWrite = () => {
    const adminAlert = window.confirm(
      "Switching to the admin side in a new tab.\nYou may need to log in again - just to keep things safe! 💫"
    );

    if (adminAlert) {
      window.open("https://word-loom-mocha.vercel.app", "_blank");
    }
  };

  const handleNotify = () => {
    toast.success(() => (
    <span>
      You’re all caught up!<br />
      <small className="text-gray-500">No notifications at the moment.</small>
    </span>
    ));
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfile = () => {
    navigate("/feed/profile");
  }

  return (
    <div className="main-container flex-col lg:px-[10vh] sm:px-[2vh] px-[1vh] overflow-y-scroll">
      <div className="lg:h-[9vh] h-[8vh]  w-full flex justify-between items-center bg-neutral-700 text-zinc-100 p-[2vh] rounded-b-4xl">
        <div className="sm:w-[50%] w-[70%] flex justify-start items-center lg:gap-[3vw] sm:gap-[3vh] gap-[1.5vh]">
          <p onClick={() => navigate("/feed")} className="lg:text-[1.7vw] text-[2.2vh] font-medium hover:cursor-pointer">Wordloom.</p>
          <input
            type="text"
            className="lg:h-[4vh] h-[2.5vh] w-[50%] bg-white rounded-2xl text-neutral-700 lg:p-[1.5vh] p-[1vh] border-2 border-neutral-700 lg:text-[1vw] text-[1.1vh] font-normal focus:outline-none"
            placeholder="Search blogs...."
          />
        </div>

        <div className="sm:w-[50%] w-[30%] flex justify-end items-center lg:gap-[2vw] sm:gap-[1.5vh] gap-[0.2vh]">
          <div className="hidden sm:flex w-auto justify-center items-center lg:gap-1 gap-2">
            <img src={write} alt="write-blog-logo" className="lg:h-[2.8vh] h-[1.9vh]" />
            <button
              onClick={handleWrite}
              className="lg:text-[1.1vw] text-[1.4vh] text-white font-medium hover:text-neutral-200 cursor-pointer"
            >
              Write
            </button>
          </div>

          <BellRing onClick={handleNotify} className="lg:h-[2.7vh] h-[1.9vh]" />
          <div className="relative flex flex-col text-left" ref={menuRef}>
            <div onClick={() => setOpen(!open)} className="cursor-pointer">
              <User className="lg:h-[3vh] h-[2vh]" />
            </div>

            {open && (
              <div className="absolute lg:h-[18vh] sm:h-[12vh] h-[16vh] right-0 flex flex-col justify-center items-center lg:mt-[5vh] mt-[4vh] mr-[1.5vh] lg:w-[10vw] sm:w-[12vh] w-[13vh] bg-white border border-gray-300 rounded-tl-4xl  rounded-br-4xl shadow-lg z-50">
                <button
                 className="sm:h-[33%] h-[25%] w-full lg:px-6 lg:py-2 px-4 py-1 text-left lg:text-[1.1vw] text-[1.2vh] text-gray-700 rounded-tl-4xl cursor-pointer hover:bg-gray-100 "
                 onClick={() => {
                    handleProfile();
                    setOpen(false);
                  }}
                > 
                  Profile
                </button>

                <button
                 className="sm:hidden h-[25%] w-full flex justify-start items-center gap-1 px-4 py-1 text-left text-[1.2vh] text-gray-700 cursor-pointer hover:bg-gray-100"
                 onClick={() => {
                    handleWrite();
                    setOpen(false);
                  }}
                >
                  <img src={appWrite} alt="pen" className="h-[1.3vh] object-cover" />
                  Write
                </button>
                <button
                  className="sm:h-[33%] h-[25%] w-full lg:px-6 lg:py-2 px-4 py-1 text-left lg:text-[1.1vw] text-[1.2vh] text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    handleWrite();
                    setOpen(false);
                  }}
                >
                  Admin Portal
                </button>
                <button
                  className="sm:h-[33%] h-[25%] w-full lg:px-6 lg:py-2 px-4 py-1 text-left lg:text-[1.1vw] text-[1.2vh] text-red-600  rounded-br-4xl cursor-pointer hover:bg-gray-100"
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
