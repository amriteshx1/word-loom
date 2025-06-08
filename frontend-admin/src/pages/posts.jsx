import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { HeartHandshake } from "../components/likes";
import blogComment from "../assets/blogComment.png";

function Posts(){
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

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

    const togglePublish = async (postId) => {

        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`http://localhost:3000/api/posts/${postId}/togglePublish`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`, },
            })

            if (!res.ok) throw new Error("Failed to publish post");
            const updated = await res.json();
            console.log(updated);
            alert(updated.post.published ? "🎉 Woohoo! Your post is live for the world to see! 🚀" : "😢 Oh no! Your post is now hidden from the spotlight...");

            setPosts((prev) =>
                prev.map((p) => (p.id === updated.post.id ? updated.post : p))
            );
            
        } catch (err) {
            console.error(err);
            alert("Error publishing post");
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);


    return(
        <>
        <div className="min-h-screen w-full flex flex-col justify-start items-center gap-[4vh] p-[2vh] bg-neutral-800">
            
            <div className="w-[100%] flex flex-col justify-center items-center p-[2vh]">
            <p className="text-[2.3vw] text-white font-bold">Your Blogs!</p>
            <hr className="w-[30%] border-2 border-white" />
            </div>


            {posts && posts.length > 0 ? (
                posts.map((item, index) => <div key={item.id} className="p-[2vh] w-full flex justify-between items-center bg-neutral-900 rounded-xl text-white">
                    <div className="h-full w-[75%] flex justify-between items-center text-white">
                        <p className="text-[1.2vw] w-[66%]"><span className="font-bold">Title: </span>{item?.title || "The abc of xyz being 123"}</p>
                        <p className="text-[1.2vw] w-[10%]"><span className="font-bold">Id: </span>{item?.id || "0"}</p>
                        <p className="flex justify-center items-center text-[1.2vw] w-[10%]"><HeartHandshake style={{height: '2.3vh'}} />: {item?.likes || "0"}</p>
                        <p className="w-[10%] flex justify-center items-center text-[1.2vw]"><img src={blogComment} alt="blogComment-logo" className="object-cover h-[2.3vh]" />: {item?.comments?.length || "0"}</p>
                    </div>
                    
                    <div className="h-full w-[20%] flex justify-between items-center">
                        <Link to={`/dashboard/edit/${item.id}`} className="flex justify-center items-center">
                            <button className="px-[3.5vh] py-[0.5vh] bg-white text-neutral-900 rounded-xl font-bold cursor-pointer hover:bg-neutral-200">Edit</button>
                        </Link>

                        <button type="button" onClick={() => togglePublish(item.id)} className="px-[2.5vh] py-[0.5vh] bg-white text-neutral-900 rounded-xl font-bold cursor-pointer hover:bg-neutral-200">{item.published ? "Unpublish" : "Publish"}</button>
                    </div>
                    
                    
                    </div>)
            ) : (
                <p className="text-[1.2vw] text-white font-medium">You don't have any posts.</p>
            )}
        </div>
        </>
    )
}

export default Posts;