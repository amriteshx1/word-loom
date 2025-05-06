import React, { use, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
                    
                    <div className="h-[5vh] w-[30%] flex justify-between items-center">
                        <Link to={`/dashboard/edit/${item.id}`} className="h-[80%] w-[35%] flex justify-center items-center">
                            <button className="h-full w-full bg-gray-200 text-gray-700 rounded-xl font-bold cursor-pointer">Edit</button>
                        </Link>

                        <button type="button"  className="h-[80%] w-[35%] bg-gray-200 text-gray-700 rounded-xl font-bold cursor-pointer">Delete</button>
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