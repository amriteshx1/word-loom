import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import searchimg from '../assets/search.png';
import notificationimg from '../assets/notification.png';
import profileimg from "../assets/profile.png";
import allpost from "../assets/allposts.png";
import allcomment from "../assets/allcomments.png";
import member from "../assets/member.png";

function Home(){
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");

    if (token) {
        const decodedToken = jwtDecode(token); 
        const userId = decodedToken.id;
        localStorage.setItem("userId", userId);
      } else {
        console.log("No token found!");
      }

      useEffect(() => {
        const fetchUser = async () => {
            try {
              const userId = localStorage.getItem("userId");
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



    return(
        <>

                <div className='h-[30vh] w-full flex flex-col justify-around items-center p-[3vh] bg-gray-100'>
                    <div className='h-[35%] w-full flex justify-between items-center p-[2vh]'>
                        <div className='h-full w-[60%] flex justify-start items-center gap-[3vh]'>
                            <img src={searchimg} alt="search-logo" className='h-[80%] object-cover'/>
                            <input type="text" className='h-[80%] w-[80%] p-[5px] rounded-2xl border-2 border-gray-700' />
                        </div>
                        <div className='h-full w-[40%] flex justify-end items-center gap-[2vh]'>
                            <img src={notificationimg} alt="notification-logo" className='h-[70%] object-cover'/>
                            <img src={profileimg} alt="profile-logo" className='h-[80%] object-cover'/>
                            <p className='text-[1.3vw] text-gray-700'>{user?.username || "Username"}</p>
                        </div>
                    </div>
    
                    <div className='h-[60%] w-full flex justify-between items-center p-[2vh]'>
                        <div className='h-full w-[60%] flex flex-col justify-center items-start'>
                            <p className='text-[1.2vw] text-gray-700'>What's up,</p>
                            <p className='text-[2.3vw] text-gray-700 font-medium'>{user?.username || "User"}!</p>
                        </div>
    
                        <div className='h-full w-[40%] flex justify-end items-center'>
                            <button type='submit' className='w-[40%] bg-gray-700 text-gray-200 p-[1vh] rounded-xl border-gray-700 border-2 cursor-pointer hover:bg-gray-600'>New Blog +</button>
                        </div>
                    
                    </div>

                </div>

                <div className='h-[70vh] w-full flex flex-col justify-around items-center p-[3vh] bg-gray-300'>
                    <p className="text-[2vw] text-gray-700 font-bold">Account Overview</p>
                    <hr className="w-[50%] border-2 border-gray-700" />
                    <p className="text-[1.5vw] text-gray-700"><span className="font-medium">User email: </span>{user?.email || "abc@gmail.com"}</p>

                    <div className="h-[50%] w-full flex justify-between items-center">
                        <div className="h-[80%] w-[30%] flex justify-around items-center gap-[1vh] p-[1vh] bg-gray-700 rounded-xl text-gray-200">
                            <div className="h-[40%] w-[35%] flex flex-col justify-center items-center gap-[0.5vh]">
                            <p className="text-[2vw]">Blogs:</p>
                            <p className="text-[2.5vw]">{user?.posts?.length || 0}</p>
                            </div>
                            <img src={allpost} alt="total-blog logo" className="h-[50%] object-cover" />
                        </div>

                        <div className="h-[80%] w-[30%] flex justify-around items-center gap-[1vh] p-[1vh] bg-gray-700 rounded-xl text-gray-200">
                           <div className="h-[40%] w-[35%] flex flex-col justify-center items-center gap-[0.5vh]">
                            <p className="text-[2vw]">Comments:</p>
                            <p className="text-[2.5vw]">{user?.comments?.length || 0}</p>
                            </div>
                            <img src={allcomment} alt="comment-logo" className="h-[50%] object-cover" />
                        </div>

                        <div className="h-[80%] w-[30%] flex justify-around items-center gap-[1vh] p-[1vh] bg-gray-700 rounded-xl text-gray-200">
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