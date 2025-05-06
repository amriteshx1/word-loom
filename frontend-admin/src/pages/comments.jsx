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
        <div className="min-h-screen w-full flex flex-col justify-start items-center gap-[4vh] p-[2vh] bg-gray-100">

            <div className="w-[100%] flex flex-col justify-center items-center">
            <p className="text-[2.3vw] text-gray-700 font-bold">Comments!</p>
            <hr className="w-[30%] border-2 border-gray-700" />
            </div>

            {comments && comments.length > 0 ? (
                comments.map((item, index) => <div key={item.id} className="min-h-[5vh] w-full flex justify-between items-center p-[1vh] bg-gray-700 rounded-xl text-gray-200">
                    <div className="min-h-[5vh] w-[65%] flex justify-between items-center">
                        <div className="min-h-[5vh] w-[65%] flex justify-start items-center whitespace-normal">
                        <p className="text-[1.2vw]"><span className="font-bold">{item.author.username}: </span>{item.content}</p>
                        </div>

                        <div className="min-h-[5vh] w-[30%] flex justify-start items-center">
                        <p className="text-[1.2vw]"><span className="font-bold">Blog: </span>{item.post.title}</p>
                        </div>

                    </div>
                    
                    <div className="h-[5vh] w-[25%] flex justify-between items-center">
                        <button type="button" onClick={() => handleEdit(item.id, item.content)} className="h-[80%] w-[35%] bg-gray-200 text-gray-700 rounded-xl font-bold cursor-pointer">Edit</button>
                        <button type="button" onClick={() => handleDelete(item.id)} className="h-[80%] w-[35%] bg-gray-200 text-gray-700 rounded-xl font-bold cursor-pointer">Delete</button>
                    </div>
                    
                    
                    </div>)
            ) : (
                <p>You don't have any comments yet.</p>
            )}


        </div>
        </>
    )
}

export default Comments;