import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BellRing } from '../components/bellring';
import { User } from '../components/profile';
import write from '../assets/write.png';
import { Rocket } from '../components/trending';
import { Flame } from '../components/featured';

export default function Feed(){
    const [posts, setPosts] = useState([])
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
                    <p className='text-[1.1vw] text-white font-medium hover:text-neutral-200 cursor-pointer'>Write</p>
                  </div>
            
                   <BellRing style={{height: '2.7vh'}} />
                   <User style={{height: '3vh'}} />

                </div>
            </div>

            <div className='h-[91vh] w-[100%] flex justify-between items-center pt-[5vh]'>

              <div className='h-full w-[60%] flex flex-col justify-start items-center p-[5vh] gap-[5vh]'>
                {posts.map(post => (
                <div key={post.id} className="h-[20vh] w-full p-4 rounded-xl bg-white shadow-md">
                  <h2 onClick={() => handlePost(post.id)} className="text-2xl font-semibold mb-2 text-neutral-800 hover:underline cursor-pointer">{post.title}</h2>
                  <div className="text-sm text-neutral-500 mb-4">
                    By {post.author.username} • {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                  <div
                    className="prose max-w-none font-medium text-neutral-700 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>
              ))}
              </div>

              <div className='h-full w-[30%] flex flex-col justify-between items-center'>
                <div className='h-[45%] w-full flex flex-col justify-start items-start bg-neutral-700 rounded-2xl p-[2vh]'>
                  <div className='flex'>
                    <p className='text-[1.2vw] text-white font-medium'>Trending</p>
                    <Rocket style={{height: '2.2vh'}} />
                  </div>
                  

                </div>

                <div className='h-[45%] w-full flex flex-col justify-start items-start bg-neutral-700 rounded-2xl p-[2vh]'>
                  <div className='flex'>
                    <p className='text[1.2vw] text-white font-medium'>Featured</p>
                    <Flame style={{height: '2.2vh'}} />

                  </div>

                </div>

              </div>
              

            </div>
    
        
    
            <div onClick={handleLogout}>
                <p className='text-neutral-800 text-[1.2vw] cursor-pointer hover:text-neutral-600 '>Sign Out</p>
                
            </div>
        </div>
    )
}