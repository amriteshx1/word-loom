import { jwtDecode } from "jwt-decode";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import searchimg from '../assets/search.png';
import allpost from "../assets/allposts.png";
import allcomment from "../assets/allcomments.png";
import member from "../assets/member.png";
import { BellRing } from "../components/bell";
import { User } from "../components/user";
import { toast } from "react-hot-toast";

function Home(){
    const [user, setUser] = useState(null);
    const [receivedCommentsCount, setReceivedCommentsCount] = useState(0);
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const token = localStorage.getItem("token");
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

    useEffect(() => {
      if (token) {
        const decodedToken = jwtDecode(token); 
        const userId = decodedToken.id;
        localStorage.setItem("userId", userId);
      } else {
        console.log("No token found!");
      }
    }, []);


    useEffect(() => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
    
      const fetchComments = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await fetch(`https://wordloom.onrender.com/api/posts/author/${userId}/comments`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          });
    
          if (!res.ok) throw new Error("Failed to fetch comments");
    
          const data = await res.json();
          setReceivedCommentsCount(data?.length || 0);
        } catch (err) {
          console.error("Error fetching comments:", err);
        }
      };
    
      fetchComments();
    }, []);


      useEffect(() => {
        const userId = localStorage.getItem("userId");
        if(!userId) return;

        const fetchUser = async () => {
            try {
              const response = await fetch(`https://wordloom.onrender.com/api/users/${userId}`);
          
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
          
              const data = await response.json();
              setUser(data);
            } catch (error) {
              console.error("Error fetching user:", error);
            }
          };
    
        fetchUser();
      }, []);

      const formattedDate = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "Loading...";

      useEffect(() => {
          function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
              setOpen(false);
            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => document.removeEventListener("mousedown", handleClickOutside);
        }, []);

        const handleNotify = () => {
          toast.success(() => (
          <span>
            You’re all caught up!<br />
            <small className="text-gray-500">No notifications at the moment.</small>
          </span>
          ));
        }


    return(
        <>

                <div className='lg:h-[30vh] h-[27vh] w-full flex flex-col justify-around items-center lg:p-[3vh] p-[2vh] bg-neutral-100 motion-preset-slide-up motion-duration-500 motion-delay-200'>
                    <div className='lg:h-[35%] h-[25%] w-full flex justify-between items-center lg:p-[2vh] p-[1vh]'>
                        <div className='h-full w-[60%] flex justify-start items-center sm:gap-[3vh] gap-[1.5vh]'>
                            <img src={searchimg} alt="search-logo" className='lg:h-[80%] sm:h-[65%] h-[75%] object-cover'/>
                            <input type="text" className='lg:h-[80%] h-[65%] w-[80%] p-[5px] text-neutral-900 rounded-2xl border-2 border-neutral-900 focus:outline-none' />
                        </div>
                        <div className='h-full w-[40%] flex justify-end items-center sm:gap-[5vh] gap-[2vh]'>
                            <BellRing onClick={handleNotify} className="sm:h-[3.4vh] h-[2.6vh] " />
                            <div className="relative flex flex-col text-left" ref={menuRef}>
                              <div onClick={() => setOpen(!open)} className="cursor-pointer bg-neutral-800 border-2 border-neutral-900 rounded-full">
                              <User className="sm:h-[3.3vh] h-[2.6vh]" />
                            </div>
                            
                            {open && (
                               <div className="absolute lg:h-[6vh] h-[5vh] right-0 flex flex-col justify-center items-center mt-[5vh] mr-[1.5vh] lg:w-[8vw] w-[11vh] bg-white border border-gray-300 rounded-tl-3xl  rounded-br-3xl shadow-md z-50">
                                 <button
                                   className=" h-[100%] w-full lg:px-6 lg:py-2 px-4 py-1  text-center lg:text-[1vw] text-[1.5vh] text-red-600 rounded-tl-3xl  rounded-br-3xl cursor-pointer hover:bg-gray-100"
                                   onClick={handleLogout}
                                 >
                                   Sign Out
                                 </button>
                               </div>
                             )}
                             </div>
                        </div>
                    </div>
    
                    <div className='lg:h-[60%] h-[70%] w-full flex justify-between items-center p-[2vh]'>
                        <div className='h-full w-[60%] flex flex-col justify-center items-start'>
                            <p className='lg:text-[1.3vw] text-[1.6vh] text-neutral-900 font-medium'>What's up,</p>
                            {user ? (
                            <p className='lg:text-[2.5vw] text-[3.7vh] text-neutral-900 font-semibold'>{user.username}!</p>
                            ) : (
                              <div className="h-[3.7vh] w-[30%] bg-neutral-300 animate-pulse rounded" />
                            )}
                        </div>
    
                        <div className='h-full w-[40%] flex justify-end items-center'>
                            <button type='button' onClick={() => navigate("/dashboard/newBlog")} className='bg-neutral-900 text-white lg:text-[1.1vw] text-[1.5vh] font-medium lg:px-[4vh] py-[1vh]  px-[2vh] rounded-xl cursor-pointer hover:bg-neutral-950'>New Blog +</button>
                        </div>
                    
                    </div>

                </div>

                <div className='lg:h-[70vh] h-[66vh]  w-full flex flex-col justify-around items-center p-[3vh] bg-neutral-800 motion-preset-slide-up motion-duration-500 motion-delay-200'>
                    <div className="w-[100%] flex flex-col justify-center items-center">
                    <p className="lg:text-[2vw] sm:text-[2.1vh] text-[2.3vh] text-white font-bold">Account Overview</p>
                    <hr className="lg:w-[35%] sm:w-[50%] w-[70%] border-2 border-white" />
                    </div>
                    <p className="lg:text-[1.5vw] sm:text-[1.7vh] text-[1.9vh] text-white flex items-center gap-2"><span className="font-semibold">User email: </span>{user ? user.email : <span className="inline-block h-[1.8vh] w-[10ch] bg-neutral-300 animate-pulse rounded" />}</p>

                    <div className="lg:h-[50%] h-[70%] w-full flex lg:flex-row flex-col justify-between items-center">
                        <div className="lg:h-[80%] h-[30%] lg:w-[30%] sm:w-[60%] w-[80%] flex justify-around items-center gap-[1vh] p-[1vh] bg-neutral-900 rounded-xl text-white">
                            <div className="h-[40%] w-[35%] flex flex-col justify-center items-center gap-[0.5vh]">
                            <p className="lg:text-[2vw] text-[2vh]">Blogs:</p>
                            <p className="lg:text-[2.5vw] text-[2.5vh]">{user?.posts?.length || 0}</p>
                            </div>
                            <img src={allpost} alt="total-blog logo" className="h-[50%] object-cover" />
                        </div>

                        <div className="lg:h-[80%] h-[30%] lg:w-[30%] sm:w-[60%] w-[80%] flex justify-around items-center gap-[1vh] p-[1vh] bg-neutral-900 rounded-xl text-white">
                           <div className="h-[40%] w-[35%] flex flex-col justify-center items-center gap-[0.5vh]">
                            <p className="lg:text-[2vw] text-[2vh]">Comments:</p>
                            <p className="lg:text-[2.5vw] text-[2.5vh]">{receivedCommentsCount}</p>
                            </div>
                            <img src={allcomment} alt="comment-logo" className="h-[50%] object-cover" />
                        </div>

                        <div className="lg:h-[80%] h-[30%] lg:w-[30%] sm:w-[60%] w-[80%] flex justify-around items-center gap-[1vh] p-[1vh] bg-neutral-900 rounded-xl text-white">
                            <div className="h-[40%] w-[50%] flex flex-col justify-center items-center gap-[0.5vh]">
                            <p className="lg:text-[2vw] text-[2vh]">Joined:</p>
                            <p className="lg:text-[1.8vw] text-[1.8vh]">{formattedDate}</p>
                            </div>
                            <img src={member} alt="user-logo" className="h-[50%] object-cover"/>
                        </div>
                    </div>

                </div>

         </>
    )
}

export default Home;