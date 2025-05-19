import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function Post(){
    const [post, setPost] = useState(null);
    const {id} = useParams();

   useEffect(() => {
  if (!id) return;

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch posts");

      const data = await res.json();
      console.log(data);
      setPost(data);
    } catch (err) {
      console.error("Error fetching post:", err);
    }
  };

  fetchPosts();
}, [id]);




    return(
        <div>
        
            {post ? (
              <>
                <h2>{post.title}</h2>
                <div
                    className="prose max-w-none font-medium text-neutral-700 mt-[5vh]"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </>
            ) : (
                <p>Loading...</p>
            )}

        </div>
    )
}