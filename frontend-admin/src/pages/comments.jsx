import React, { use, useEffect, useState } from "react";

function Comments(){
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {

          const userId = localStorage.getItem("userId");
          const token = localStorage.getItem("token");

          const res = await fetch(`http://localhost:3000/api/posts/author/${userId}/comments`, {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`, },
          });

          if (!res.ok) throw new Error("Failed to fetch posts");

          const data = await res.json();
          console.log(data);
          setComments(data);
        };
        fetchComments();
      }, []);

      const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    
        if (!confirmDelete) return;

         const token = localStorage.getItem("token");

         const res = await fetch(`http://localhost:3000/api/posts/comments/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`, },
         })
         if (res.ok) {
            setComments(comments.filter(c => c.id !== id));
        }
      }

      const handleEdit = async (id, currentContent) => {
        const updatedContent = window.prompt("Edit the comment:", currentContent);
    
        if (!updatedContent) return;
    
        const token = localStorage.getItem("token");
    
        const res = await fetch(`http://localhost:3000/api/posts/comments/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify({ content: updatedContent }),
        });
    
        if (res.ok) {
            setComments(comments.map(c => c.id === id ? { ...c, content: updatedContent } : c));
        }
    };


    return(
        <>
        <div className="min-h-full w-full flex flex-col justify-start items-center gap-[4vh] p-[2vh] bg-neutral-800 motion-preset-slide-up motion-duration-500">

            <div className="w-[100%] flex flex-col justify-center items-center p-[2vh]">
            <p className="lg:text-[2.3vw] text-[2.3vh] text-white font-bold">Comments!</p>
            <hr className="lg:w-[30%] w-[50%] border-2 border-white" />
            </div>

            {comments && comments.length > 0 ? (
                comments.map((item, index) => <div key={item.id} className="p-[2vh] w-full flex lg:flex-row flex-col lg:justify-between justify-center lg:gap-0 gap-[2vh] items-center bg-neutral-900 rounded-xl text-white">
                    <div className="h-full lg:w-[75%] w-full flex justify-between items-center">
                        <div className="h-full w-[65%] flex justify-start items-center whitespace-normal">
                        <p className="lg:text-[1.2vw] text-[1.5vh]"><span className="font-bold">{item.author.username}: </span>{item.content}</p>
                        </div>

                        <div className="w-[25%] flex justify-start items-center">
                        <p className="lg:text-[1.2vw] text-[1.5vh]"><span className="font-bold">Blog Id: </span>{item.postId}</p>
                        </div>

                    </div>
                    
                    <div className="h-full lg:w-[20%] w-full flex lg:justify-between justify-center lg:gap-0 gap-[2vh] items-center">
                        <button type="button" onClick={() => handleEdit(item.id, item.content)} className="lg:px-[4vh] lg:py-[0.5vh] px-[2vh] py-[0.3vh] bg-white lg:text-[1vw] text-[1.4vh] text-neutral-900 rounded-xl font-bold cursor-pointer hover:bg-neutral-200">Edit</button>
                        <button type="button" onClick={() => handleDelete(item.id)} className="lg:px-[3vh] lg:py-[0.5vh] px-[1.8vh] py-[0.3vh] bg-white lg:text-[1vw] text-[1.4vh] text-neutral-900 rounded-xl font-bold cursor-pointer hover:bg-neutral-200">Delete</button>
                    </div>
                    
                    
                    </div>)
            ) : (
                <p className="lg:text-[1.2vw] text-[1.3vh] text-white font-medium">You don't have any comments yet.</p>
            )}


        </div>
        </>
    )
}

export default Comments;