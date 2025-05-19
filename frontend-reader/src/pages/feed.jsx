import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
                <div className='w-[60%] flex justify-start items-center'>
                    <p className='text-[1.7vw] font-medium'>Wordloom.</p>
                </div>
            </div>
    
            {posts.map(post => (
                <div key={post.id} className="h-[25vh] w-[50vw] p-4 rounded-xl bg-white shadow-md mb-6">
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
    
            <div onClick={handleLogout}>
                <p className='text-neutral-800 text-[1.2vw] cursor-pointer hover:text-neutral-600 '>Sign Out</p>
                
            </div>
        </div>
    )
}