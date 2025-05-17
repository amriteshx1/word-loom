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
    

    return(
        <div>
        <h1>Hiii u are at feed!</h1>

        {posts.map(post => (
            <div key={post.id} className="p-4 rounded-xl bg-white shadow mb-6">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <div className="text-sm text-neutral-500 mb-4">
                By {post.author.username} • {new Date(post.createdAt).toLocaleDateString()}
              </div>
              <div
                className="prose max-w-none text-neutral-800"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
        ))}

        <div onClick={handleLogout}>
            <p>Sign Out</p>
        </div>
        </div>
    )
}