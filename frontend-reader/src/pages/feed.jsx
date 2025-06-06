import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { Rocket } from '../components/trending';
import { Flame } from '../components/featured';
import { HeartHandshake } from '../components/blogLike';
import comments from '../assets/comments.png';

export default function Feed(){
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState(null);
    const [clickedId, setClickedId] = useState(null);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    //setting user-id
    const token = localStorage.getItem("token");
    if (token) {
        const decodedToken = jwtDecode(token); 
        const userId = decodedToken.id;
        localStorage.setItem("userId", userId);
      } else {
        console.log("No token found!");
      }

    //getting user-info
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

    //increase blog likes
    const increaseLike = async (id) => {
      setClickedId(id);
      setTimeout(() => setClickedId(null), 120); 

      const token = localStorage.getItem("token");
      await fetch(`http://localhost:3000/api/posts/${id}/like`, {
       method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    setPosts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, likes: p.likes + 1 } : p
      )
    );
    }

    //trending blogs
    const trendingPosts = [...posts]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 4);

    //featured blogs
    const featuredPosts = [...posts]
    .sort((a, b) => b._count.comments - a._count.comments)
    .slice(0, 4);

    return(

            <div className='h-[91vh] w-full flex justify-between items-center pt-[5vh]'>

              <div className='h-full w-[60%] flex flex-col justify-start items-center overflow-y-scroll'>

                <div className='h-[12%] w-full flex flex-col justify-start gap-1 items-start px-4'>
                  <p className='text-[2.3vw] font-semibold bg-gradient-to-tl from-neutral-950 via-zinc-500 to-neutral-700 bg-clip-text text-transparent'>: ̗̀➛ ❝ Yo {user?.username || "User"}, what’s cookin’?</p>
                  <hr className='w-full border-neutral-200' />
                </div>

                <div className='h-[10%] w-full flex flex-col justify-end items-start mt-[7vh] gap-1 px-4'>
                  <p className='text-2xl font-semibold text-neutral-700'>Let's flow :</p>
                  <hr className='w-[15%] border-neutral-200' />
                </div>

                <div className='h-[88%] w-full flex flex-col justify-start items-center gap-[5vh]'>
                {posts.map(post => (
                <div key={post.id} className="h-[28vh] w-full flex justify-between items-center p-4 rounded-xl bg-white shadow-md">
                  <div className='h-full w-[70%] flex flex-col justify-around items-start'>
                  <p onClick={() => handlePost(post.id)} className="text-2xl font-semibold mb-1 text-neutral-700 hover:underline cursor-pointer">{post.title}</p>
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

                  <div className='flex justify-start items-center mt-[1vh] gap-[2vw]'>
                    <div onClick={() => increaseLike(post.id)} className= {`flex items-center gap-[0.2vw] cursor-pointer transition-transform duration-150 ${
                      clickedId === post.id ? 'scale-90' : ''}`}>

                      <HeartHandshake style={{height: '2.5vh'}} />
                      <span className="text-neutral-700 font-medium">{post.likes}</span>
                    </div>
                    
                    <div className='flex items-center gap-[0.3vw] cursor-pointer'>
                      <img src={comments} alt="comment-logo" className='h-[2.5vh] object-cover' />
                      <span className="text-neutral-700 font-medium">{post._count.comments}</span>
                    </div>
                  </div>
                  
                </div>

                <div className='h-full w-[25%] flex justify-center items-center'>
                  <img src={post.thumbnail} alt="blog-thumbnail" className='h-[80%] object-cover rounded-xl'/>
                </div>

                </div>
              ))}
              </div>
              </div>

              <div className='h-full w-[30%] flex flex-col justify-between items-center pb-[5vh]'>
                <div className='h-[45%] w-full flex flex-col justify-between items-start bg-neutral-700 rounded-2xl p-[2vh]'>
                  <div className='flex'>
                    <p className='text-[1.2vw] text-white font-medium'>Trending</p>
                    <Rocket style={{height: '2.2vh'}} />
                  </div>
                  
                  <div className='flex h-[80%] justify-between flex-col'>
                  {trendingPosts.map((post) => (
                   <div key={post.id} onClick={() => handlePost(post.id)} className="cursor-pointer mb-2">
                   <p className="text-white text-[1vw] hover:underline">✨ {post.title}</p>
                   </div>
                  ))};
                  </div>
                  

                </div>

                <div className='h-[45%] w-full flex flex-col justify-between items-start bg-neutral-700 rounded-2xl p-[2vh]'>
                  <div className='flex'>
                    <p className='text-[1.2vw] text-white font-medium'>Featured</p>
                    <Flame style={{height: '2.2vh'}} />
                  </div>

                  <div className='flex h-[80%] justify-between flex-col'>
                  {featuredPosts.map((post) => (
                   <div key={post.id} onClick={() => handlePost(post.id)} className="cursor-pointer mb-2">
                   <p className="text-white text-[1vw] hover:underline">❄️ {post.title}</p>
                   </div>
                  ))};
                  </div>

                </div>

              </div>
              

            </div>
    )
};