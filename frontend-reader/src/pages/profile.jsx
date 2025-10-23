import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User2 } from '../components/profile2';
import toast from 'react-hot-toast';

export default function Profile(){

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("No token found. Redirecting to home page.");
            navigate("/");
            toast.error("You need to log in to view the profile.");
            return;
        }
    }, [navigate]);

    useEffect(() => {
        toast(() => (
          <span>This page is not functional yet! <br />
          <small className="text-gray-500">Just a glimpse of what’s coming next.</small>
          </span>
        ));
        
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

    return(
        <div className='h-[91vh] w-full grid lg:grid-cols-[2.7fr_1.3fr] grid-cols-1 motion-preset-slide-up motion-duration-500'>
            <div className="border-r-1 border-r-neutral-200 flex flex-col justify-between items-start">
                <div className='lg:h-[30%] h-[25%] w-full flex flex-col gap-[2vh] lg:p-10 p-8'>
                {user ? (
                <p className='font-bold lg:text-[4vw] text-[4vh] text-neutral-700'>{user.username}</p>
                ) : (
                  <div className="h-[4vh] w-[40%] bg-neutral-200 animate-pulse rounded" />
                )}
                <div className='w-full flex justify-start items-center gap-[4vh] mt-[1vh]'>
                    <button className='px-3 py-1 lg:text-[1vw] text-[1.1vh] text-white bg-neutral-700 rounded-2xl border cursor-pointer'>Home</button>
                    <button className='px-3 py-1 lg:text-[1vw] text-[1.1vh] text-neutral-700 bg-white rounded-2xl border cursor-pointer'>Saved</button>
                    <button className='px-3 py-1 lg:text-[1vw] text-[1.1vh] text-neutral-700 bg-white rounded-2xl border cursor-pointer'>About</button>
                </div>
                <hr className='w-full border-neutral-200' />
                </div>

                <div className='lg:h-[70%] h-[75%] w-full flex flex-col justify-start items-start gap-[2vh] lg:p-10 p-8'>
                    <p className='text-neutral-700 lg:text-[1.5vw] text-[1.6vh] font-semibold'>◾ Version-2 Announcements:</p>
                    <p className='text-neutral-700 lg:text-[1.1vw] text-[1.2vh]'>- Users will be able to add blogs to their reading list.</p>
                    <p className='text-neutral-700 lg:text-[1.1vw] text-[1.2vh]'>- Users will be able to follow authors.</p>
                    <p className='text-neutral-700 lg:text-[1.1vw] text-[1.2vh]'>- Users will be able to view their published blogs & comments on other's blogs directly from the profile tab.</p>
                    <p className='text-neutral-700 lg:text-[1.1vw] text-[1.2vh]'>- Writers will be able to see charts showing everything they need to know (on admin portal).</p>
                    <p className='text-neutral-700 lg:text-[1.1vw] text-[1.2vh]'>- A solid architecture and many new micro-interections.</p>
                    <p className='text-neutral-700 lg:text-[1.1vw] text-[1.2vh]'>- Improved support system.</p>
                    <p className='text-neutral-700 lg:text-[1.2vw] text-[1.3vh] font-medium'>Last but not the least, thank you so much for being here 🖤</p>
                    <p className='text-neutral-700 lg:text-[1.2vw] text-[1.3vh] font-medium'>Till then, it's your boy - signing off!</p>
                </div>

            </div>

            <div className='hidden lg:flex flex-col justify-between items-start'>
                <div className='h-[30%] w-full flex flex-col justify-start items-start gap-[2vh] p-9'>
                    <div className='bg-neutral-700 rounded-full'>
                    <User2 className="lg:h-[10vh] h-[2vh] w-auto" />
                    </div>
                    {user ? (
                    <p className='font-bold text-[1.2vw] text-neutral-700'>- {user.username}</p>
                    ) : (
                      <div className="h-[2vh] w-[8ch] bg-neutral-200 animate-pulse rounded" />
                    )}
                    <p className='font-medium text-[1vw] text-neutral-500'><span className='text-white'>- </span>1 follower</p>
                </div>

                <div className='h-[15%] w-full flex justify-start items-center gap-[2vh] p-9'>
                    <p className='text-[0.8vw]  text-neutral-700 cursor-pointer  hover:text-neutral-500'>Help</p>
                    <p className='text-[0.8vw]  text-neutral-700 cursor-pointer  hover:text-neutral-500'>About</p>
                    <p className='text-[0.8vw]  text-neutral-700 cursor-pointer  hover:text-neutral-500'>Privacy</p>
                    <p className='text-[0.8vw]  text-neutral-700 cursor-pointer  hover:text-neutral-500'>Terms</p>
                </div>
            </div>
        </div>
    )
};