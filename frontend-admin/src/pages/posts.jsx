import React, { useEffect, useState } from "react";

function Posts(){
    const [posts, setPosts] = useState([]);


    const fetchPosts = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("token");
           
            const res = await fetch(`http://localhost:3000/api/posts/myposts/${userId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`, },
            });

            if (!res.ok) throw new Error("Failed to fetch posts");

            const data = await res.json();
            console.log(data);
            setPosts(data);
            
        } catch (err) {
            console.error(err);
            alert("Could not load posts");
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);


    return(
        <>
        <div className="min-h-screen w-full bg-gray-100">
            <h1>See the console!</h1>
        </div>
        </>
    )
}

export default Posts;