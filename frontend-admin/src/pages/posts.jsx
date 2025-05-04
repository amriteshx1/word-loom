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
        <div className="min-h-screen w-full flex flex-col justify-start items-center gap-[4vh] p-[2vh] bg-gray-100">
            
            <div className="w-[100%] flex flex-col justify-center items-center">
            <p className="text-[2.3vw] text-gray-700 font-bold">Your Blogs!</p>
            <hr className="w-[40%] border-2 border-gray-700" />
            </div>


            {posts && posts.length > 0 ? (
                posts.map((item, index) => <div key={index} className="h-[7vh] w-full flex justify-between items-center p-[1vh] bg-gray-700 rounded-xl text-gray-200">
                    <div className="h-full w-[50%] flex justify-between items-center">
                        <p className="text-[1.2vw]"><span className="font-bold">Title: </span>{item.title}</p>
                        <p className="text-[1.2vw]"><span className="font-bold">Id: </span>{item.id}</p>
                    </div>
                    
                    <div className="h-full w-[25%] flex justify-between items-center">
                        <button type="button">Edit</button>
                        <button type="button">Publish/Unpublish</button>
                    </div>
                    
                    
                    </div>)
            ) : (
                <p>You don't have any posts.</p>
            )}
        </div>
        </>
    )
}

export default Posts;