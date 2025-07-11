import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { Rocket } from '../components/trending';
import { Flame } from '../components/featured';
import { HeartHandshake } from '../components/blogLike';
import comments from '../assets/comments.png';
import { toast } from 'react-hot-toast';

export default function Feed(){
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState(null);
    const [greeting, setGreeting] = useState("");
    const [activeCategory, setActiveCategory] = useState("For You");
    const [shuffledPosts, setShuffledPosts] = useState([]);
    const navigate = useNavigate();

    const categories = ["For You", "Tech", "Marketing", "Politics", "Entertainment", "Business", "Life"];

    const greetings = [
      (name) => `Yo ${name}, what’s cookin’?`,
      (name) => `What’s good, ${name}? Let’s go!`,
      (name) => `${name}, in the zone today?`,
      (name) => `Let’s vibe, ${name} 🎧`,
      (name) => `Feed’s waiting, ${name} 📝`,
      (name) => `Be bold. Be loud. Be ${name}.`,
      (name) => `Just you and the words, ${name}.`,
      (name) => `${name}, this is your space.`,
    ];

     // Set greeting when user loads
    useEffect(() => {
        if (user?.username) {
          const random = Math.floor(Math.random() * greetings.length);
          const selectedGreeting = greetings[random](user.username);
          setGreeting(selectedGreeting);
        }
    }, [user]);

    //setting user-id
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token); 
        const userId = decodedToken.id;
        localStorage.setItem("userId", userId);
      } else {
        console.log("No token found!");
      }
    }, []);

    //getting user-info
    useEffect(() => {
        const fetchUser = async () => {
            try {
              const userId = localStorage.getItem("userId");
              const response = await fetch(`https://wordloom.onrender.com/api/users/${userId}`);
          
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
          
              const data = await response.json();
              setUser(data);
            } catch (error) {
              console.error("Error fetching user:", error);
              toast.error("Failed to fetch user.");
            }
          };
    
        fetchUser();
      }, []);

    useEffect(() => {
        const fetchPosts = async() => {
            const token = localStorage.getItem("token");

            const res = await fetch(`https://wordloom.onrender.com/api/posts`, {
              method: "GET",
              headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`, },
            });

            if (!res.ok) throw new Error("Failed to fetch posts");

            const data = await res.json();
            setPosts(data);
        }

        fetchPosts();
    }, []);
    
    const handlePost = (id) => {
      navigate(`/feed/post/${id}`)
    }

    //trending blogs
    const trendingPosts = [...posts]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 4);

    //featured blogs
    const featuredPosts = [...posts]
    .sort((a, b) => b._count.comments - a._count.comments)
    .slice(0, 4);

    // Shuffle only once when posts first load
    useEffect(() => {
      if (posts.length > 0 && shuffledPosts.length === 0) {
        const shuffled = [...posts].sort(() => Math.random() - 0.5);
        setShuffledPosts(shuffled);
      }
    }, [posts, shuffledPosts]);

    //filer posts based on category
    const displayedPosts =
      activeCategory === "For You"
        ? shuffledPosts
        : posts.filter(p => p.category === activeCategory);

    return(

            <div className='h-[91vh] w-full flex justify-between items-center lg:pt-[5vh] pt-[2vh] motion-preset-slide-up motion-duration-500'>

              <div className='h-full lg:w-[60%] w-full flex flex-col justify-start items-center overflow-y-scroll'>

                <div className='lg:h-[10%] sm:h-[5%] h-[6%] w-full flex flex-col justify-start gap-1 items-start px-4'>
                  {greeting ? (
                  <p className='lg:text-[2.3vw] text-[2.3vh] font-semibold bg-gradient-to-tl from-neutral-950 via-zinc-500 to-neutral-700 bg-clip-text text-transparent motion-preset-slide-up motion-duration-500'>❝ {greeting}</p>
                  ) : (
                    <div className='w-[60%] h-6 bg-neutral-300 rounded animate-pulse'></div>
                  )}
                  <hr className='w-full border-neutral-200' />
                </div>

                <div className='lg:h-[10%] sm:h-[5%] h-[10%] w-full flex flex-col justify-end items-start mt-[0.5vh] gap-1'>
                  <div className="flex flex-wrap gap-3 px-4 py-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3 py-1 rounded-full border lg:text-[1vw] text-[1.1vh] cursor-pointer font-medium transition duration-200 ${
                          activeCategory === cat ? 'bg-neutral-700 text-white' : 'bg-white text-neutral-700'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className='lg:h-[70%] sm:h-[80%] h-[75%] w-full flex flex-col justify-start mt-[3vh] items-center gap-[5vh]  motion-preset-slide-up motion-duration-500'>
                {displayedPosts.length > 0 ? (
                 displayedPosts.map(post => (
                <div key={post.id} onClick={() => handlePost(post.id)} className="max-h-[30vh] w-full flex justify-between items-center cursor-pointer p-4 rounded-xl bg-white shadow-md">
                  <div className='h-full w-[70%] flex flex-col justify-around items-start'>
                  <p className="lg:text-2xl sm:text-xl text-lg font-bold mb-1 text-neutral-700 cursor-pointer">{post.title}</p>
                  <div className="lg:text-[1vw] text-[1.2vh] text-neutral-600 mb-2">
                    By <span className='font-medium cursor-pointer hover:underline'>{post.author.username} </span> | {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  </div>
                  <div
                    className="prose-sm sm:prose max-w-none font-medium text-neutral-700 line-clamp-1"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  <div className='flex justify-start items-center mt-[1vh] lg:gap-[2vw] gap-[2vh]'>
                    <div className= {"flex items-center gap-[0.2vw] cursor-pointer"}>

                      <HeartHandshake className="lg:h-[2.5vh] sm:h-[1.9vh] h-[1.7vh]" />
                      <span className="text-neutral-700 lg:text-[1vw] text-[1.2vh] font-medium">{post.likes}</span>
                    </div>
                    
                    <div className='flex items-center lg:gap-[0.3vw] sm:gap-[0.2vh] gap-[0.5vh] cursor-pointer'>
                      <img src={comments} alt="comment-logo" className='lg:h-[2.5vh] sm:h-[1.9vh] h-[1.7vh] object-cover' />
                      <span className="text-neutral-700 lg:text-[1vw] text-[1.2vh] font-medium">{post._count.comments}</span>
                    </div>
                  </div>
                  
                </div>

                <div className='h-full w-[25%] flex justify-center items-start p-4'>
                  <img src={post.thumbnail} alt="blog-thumbnail" className='lg:h-[75%] sm:h-[65%] h-[55%] object-cover rounded-xl'/>
                </div>

                </div>
              ))
            ) : (
              Array(3).fill().map((_, i) => (
               <div key={i} className="max-h-[30vh] w-full flex justify-between items-center p-4 rounded-xl bg-white shadow-md animate-pulse">
                 <div className='h-full w-[70%] flex flex-col justify-around items-start gap-2'>
                   <div className="h-6 w-[80%] bg-neutral-300 rounded" />
                   <div className="h-4 w-[60%] bg-neutral-200 rounded" />
                   <div className="h-4 w-[90%] bg-neutral-200 rounded" />
                   <div className="flex gap-4 mt-2">
                     <div className="h-4 w-12 bg-neutral-300 rounded" />
                     <div className="h-4 w-12 bg-neutral-300 rounded" />
                   </div>
                 </div>
                 <div className='h-full w-[25%] flex justify-center items-start p-4'>
                   <div className="h-[75%] w-full bg-neutral-300 rounded-xl" />
                 </div>
               </div>
              ))
            )}
              </div>
              </div>

              <div className='hidden lg:flex h-full w-[30%] flex-col justify-between items-center pb-[5vh] motion-preset-slide-up motion-duration-500'>
                <div className='h-[47%] w-full flex flex-col justify-between items-start bg-neutral-700 rounded-2xl p-[2vh]'>
                  <div className='flex'>
                    <p className='text-[1.2vw] text-white font-medium'>Trending</p>
                    <Rocket style={{height: '2.2vh'}} />
                  </div>
                  
                  <div className='flex h-[83%] w-full justify-between flex-col'>
                  {trendingPosts.length > 0 ? 
                   (trendingPosts.map((post) => (
                   <div key={post.id} onClick={() => handlePost(post.id)} className="cursor-pointer mb-2">
                   <p className="text-white text-[1vw] flex">
                    <span className="mr-2">➲</span>
                    <span className="flex-1">{post.title}</span>
                   </p>
                   </div>
                  ))
                  ) : (
                    Array(4).fill().map((_, i) => (
                      <div key={i} className="h-4 w-[90%] bg-neutral-500 rounded animate-pulse mb-2" />
                    ))
                  )}
                  </div>
                  

                </div>

                <div className='h-[47%] w-full flex flex-col justify-between items-start bg-neutral-700 rounded-2xl p-[2vh] motion-preset-slide-up motion-duration-500'>
                  <div className='flex'>
                    <p className='text-[1.2vw] text-white font-medium'>Featured</p>
                    <Flame style={{height: '2.2vh'}} />
                  </div>

                  <div className='flex h-[83%] w-full justify-between flex-col'>
                  {featuredPosts.length > 0 ?
                   (featuredPosts.map((post) => (
                   <div key={post.id} onClick={() => handlePost(post.id)} className="cursor-pointer mb-2">
                   <p className="text-white text-[1vw] flex">
                    <span className='mr-2'>➲</span> 
                    <span className='flex-1'>{post.title}</span>
                    </p>
                   </div>
                  ))
                  ) : (
                    Array(4).fill().map((_, i) => (
                      <div key={i} className="h-4 w-[90%] bg-neutral-500 rounded animate-pulse mb-2" />
                    ))
                  )}
                  </div>

                </div>

              </div>
              

            </div>
    )
};