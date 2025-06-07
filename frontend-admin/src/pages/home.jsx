import { jwtDecode } from "jwt-decode";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import searchimg from '../assets/search.png';
import allpost from "../assets/allposts.png";
import allcomment from "../assets/allcomments.png";
import member from "../assets/member.png";
import { BellRing } from "../components/bell";
import { User } from "../components/user";

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
          const res = await fetch(`http://localhost:3000/api/posts/author/${userId}/comments`, {
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
              const response = await fetch(`http://localhost:3000/api/users/${userId}`);
          
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



    return(
        <>

                <div className='h-[30vh] w-full flex flex-col justify-around items-center p-[3vh] bg-neutral-100'>
                    <div className='h-[35%] w-full flex justify-between items-center p-[2vh]'>
                        <div className='h-full w-[60%] flex justify-start items-center gap-[3vh]'>
                            <img src={searchimg} alt="search-logo" className='h-[80%] object-cover'/>
                            <input type="text" className='h-[80%] w-[80%] p-[5px] text-neutral-900 rounded-2xl border-2 border-neutral-900' />
                        </div>
                        <div className='h-full w-[40%] flex justify-end items-center gap-[5vh]'>
                            <BellRing style={{ height: "3.4vh" }} />
                            <div className="relative flex flex-col text-left" ref={menuRef}>
                              <div onClick={() => setOpen(!open)} className="cursor-pointer bg-neutral-800 border-2 border-neutral-900 rounded-full">
                              <User style={{ height: "3.3vh" }} />
                            </div>
                            
                            {open && (
                               <div className="absolute h-[6vh] right-0 flex flex-col justify-center items-center mt-[5vh] mr-[1.5vh] w-[8vw] bg-white border border-gray-300 rounded-tl-4xl  rounded-br-4xl shadow-md z-50">
                                 <button
                                   className=" h-[100%] w-full px-6 py-2 text-center text-red-600 rounded-tl-4xl  rounded-br-4xl cursor-pointer hover:bg-gray-100"
                                   onClick={handleLogout}
                                 >
                                   Sign Out
                                 </button>
                               </div>
                             )}
                             </div>
                        </div>
                    </div>
    
                    <div className='h-[60%] w-full flex justify-between items-center p-[2vh]'>
                        <div className='h-full w-[60%] flex flex-col justify-center items-start'>
                            <p className='text-[1.3vw] text-neutral-900 font-medium'>What's up,</p>
                            <p className='text-[2.5vw] text-neutral-900 font-semibold'>{user?.username || "User"}!</p>
                        </div>
    
                        <div className='h-full w-[40%] flex justify-end items-center'>
                            <button type='button' onClick={() => navigate("/dashboard/newBlog")} className='bg-neutral-900 text-white font-medium px-[4vh] py-[1vh] rounded-xl cursor-pointer hover:bg-neutral-950'>New Blog +</button>
                        </div>
                    
                    </div>

                </div>

                <div className='h-[70vh] w-full flex flex-col justify-around items-center p-[3vh] bg-neutral-800'>
                    <div className="w-[100%] flex flex-col justify-center items-center">
                    <p className="text-[2vw] text-white font-bold">Account Overview</p>
                    <hr className="w-[35%] border-2 border-white" />
                    </div>
                    <p className="text-[1.5vw] text-white"><span className="font-semibold">User email: </span>{user?.email || "abc@gmail.com"}</p>

                    <div className="h-[50%] w-full flex justify-between items-center">
                        <div className="h-[80%] w-[30%] flex justify-around items-center gap-[1vh] p-[1vh] bg-neutral-900 rounded-xl text-white">
                            <div className="h-[40%] w-[35%] flex flex-col justify-center items-center gap-[0.5vh]">
                            <p className="text-[2vw]">Blogs:</p>
                            <p className="text-[2.5vw]">{user?.posts?.length || 0}</p>
                            </div>
                            <img src={allpost} alt="total-blog logo" className="h-[50%] object-cover" />
                        </div>

                        <div className="h-[80%] w-[30%] flex justify-around items-center gap-[1vh] p-[1vh] bg-neutral-900 rounded-xl text-white">
                           <div className="h-[40%] w-[35%] flex flex-col justify-center items-center gap-[0.5vh]">
                            <p className="text-[2vw]">Comments:</p>
                            <p className="text-[2.5vw]">{receivedCommentsCount}</p>
                            </div>
                            <img src={allcomment} alt="comment-logo" className="h-[50%] object-cover" />
                        </div>

                        <div className="h-[80%] w-[30%] flex justify-around items-center gap-[1vh] p-[1vh] bg-neutral-900 rounded-xl text-white">
                            <div className="h-[40%] w-[50%] flex flex-col justify-center items-center gap-[0.5vh]">
                            <p className="text-[2vw]">Joined:</p>
                            <p className="text-[1.8vw]">{formattedDate}</p>
                            </div>
                            <img src={member} alt="user-logo" className="h-[50%] object-cover"/>
                        </div>
                    </div>

                </div>

         </>
    )
}

export default Home;