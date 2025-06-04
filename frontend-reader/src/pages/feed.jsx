import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BellRing } from '../components/bellring';
import { User } from '../components/profile';
import write from '../assets/write.png';
import { Rocket } from '../components/trending';
import { Flame } from '../components/featured';
import { HeartHandshake } from '../components/blogLike';
import comments from '../assets/comments.png';

export default function Feed(){
    const [posts, setPosts] = useState([])
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
      function handleClickOutside(event) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          navigate("/");
        }
    };

    useEffect(() => {
        const fetchPosts = async() => {
            const token = localStorage.getItem("token");

            const res = await fetch(`http://localhost:3000/api/posts`, {
              method: "GET",
              headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`, },
            });

            if (!res.ok) throw new Error("Failed to fetch posts");

            const data = await res.json();
            console.log(data);
            setPosts(data);
        }

        fetchPosts();
    }, []);
    
    const handlePost = (id) => {
      navigate(`/feed/post/${id}`)
    }

    const handleWrite = () => {
      const adminAlert = window.confirm("Switching to the admin side in a new tab.\nYou may need to log in again - just to keep things safe! 💫");

      if(adminAlert){
        window.open("http://localhost:5174", "_blank");
      }

    }

    return(
        <div className="main-container flex-col pr-[10vh] pl-[10vh]">
            <div className='h-[9vh] w-full flex justify-between items-center bg-neutral-700 text-zinc-100 p-[2vh] rounded-b-4xl'>
                <div className='w-[50%] flex justify-start items-center gap-[3vw]'>
                    <p className='text-[1.7vw] font-medium'>Wordloom.</p>
                    <input type="text" className='h-[4vh] w-[50%] bg-white rounded-2xl text-neutral-700 p-[1.5vh] border-2 border-neutral-700 text-[1vw] font-normal' placeholder='Search blogs....'/>
                </div>

                <div className='w-[50%] flex justify-end items-center gap-[2vw]'>
                  <div className='w-auto flex justify-center items-center gap-1'>
                    <img src={write} alt="write-blog-logo" className='h-[2.8vh]'/>
                    <button onClick={handleWrite} className='text-[1.1vw] text-white font-medium hover:text-neutral-200 cursor-pointer'>Write</button>
                  </div>
            
                   <BellRing style={{height: '2.7vh'}} />
                   <div className='relative flex flex-col text-left' ref={menuRef}>
                    <div onClick={() => setOpen(!open)} className="cursor-pointer">
                      <User style={{height: '3vh'}} />
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

            <div className='h-[91vh] w-full flex justify-between items-center pt-[5vh]'>

              <div className='h-full w-[60%] flex flex-col justify-start items-center gap-[5vh] overflow-y-scroll'>
                {posts.map(post => (
                <div key={post.id} className="h-[28vh] w-full flex justify-between items-center p-4 rounded-xl bg-white shadow-md">
                  <div className='h-full w-[70%] flex flex-col justify-around items-start'>
                  <h2 onClick={() => handlePost(post.id)} className="text-2xl font-semibold mb-1 text-neutral-800 hover:underline cursor-pointer">{post.title}</h2>
                  <div className="text-[1vw] text-neutral-600 mb-2">
                    By <span className='font-medium'>{post.author.username} </span> | {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  </div>
                  <div
                    className="prose max-w-none font-medium text-neutral-700 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                  <div className='flex justify-start items-center gap-[3vw]'>
                    <HeartHandshake style={{height: '2.5vh'}} />
                    <img src={comments} alt="comment-logo" className='h-[2.5vh] object-cover' />

                  </div>
                  
                </div>

                <div className='h-full w-[25%] flex justify-center items-center'>
                  <img src={post.thumbnail} alt="blog-thumbnail" className='h-[85%] object-cover rounded-xl'/>
                </div>

                </div>
              ))}
              </div>

              <div className='h-full w-[30%] flex flex-col justify-between items-center pb-[5vh]'>
                <div className='h-[45%] w-full flex flex-col justify-start items-start bg-neutral-700 rounded-2xl p-[2vh]'>
                  <div className='flex'>
                    <p className='text-[1.2vw] text-white font-medium'>Trending</p>
                    <Rocket style={{height: '2.2vh'}} />
                  </div>
                  

                </div>

                <div className='h-[45%] w-full flex flex-col justify-start items-start bg-neutral-700 rounded-2xl p-[2vh]'>
                  <div className='flex'>
                    <p className='text-[1.2vw] text-white font-medium'>Featured</p>
                    <Flame style={{height: '2.2vh'}} />

                  </div>

                </div>

              </div>
              

            </div>
    
        </div>
    )
}