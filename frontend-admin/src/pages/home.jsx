import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import searchimg from '../assets/search.png';
import notificationimg from '../assets/notification.png';
import profileimg from "../assets/profile.png";

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
              const userId = localStorage.getItem('userId');
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

                <div className='min-h-[70vh] w-full flex flex-col justify-start items-start gap-[2vh] p-[3vh] bg-gray-300'>
                    <p>{user?.email || "abc@gmail.com"}</p>

                </div>
                


         </>
    )
}

export default Home;