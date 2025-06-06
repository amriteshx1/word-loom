import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { HeartHandshake } from '../components/blogLike';
import comments from '../assets/comments.png';

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
        <div className="h-[91vh] w-[50%] flex flex-col justify-start items-center gap-[5vh]">
        
            {post ? (
              <>
              <div className="max-h-[50%] w-full flex flex-col justify-start items-start mt-[10vh] gap-[3vh]">
                <p className="text-[3vw] text-neutral-700 font-bold">{post.title}</p>
                <p className="text-[1.2vw] text-neutral-700 font-medium">By <span className="text-[1.3vw] text-neutral-700 font-semibold">{post.author.username} </span>
                • {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}</p>
                  
                <div className="flex flex-col w-full justify-center items-center gap-[1vw]">
                <hr className="w-full border-neutral-200 " />
                <div className="w-full flex justify-start items-center gap-[3vw]">
                  <div className="flex items-center gap-[0.3vw] cursor-pointer">
                    <HeartHandshake style={{height: '2.5vh'}} />
                    <span className="text-neutral-700 font-medium">{post.likes}</span>
                  </div>

                  <div className='flex items-center gap-[0.3vw] cursor-pointer'>
                    <img src={comments} alt="comment-logo" className='h-[2.5vh] object-cover' />
                    <span className="text-neutral-700 font-medium">{post._count.comments}</span>
                  </div>
                </div>
                <hr className="w-full border-neutral-200 " />
                </div>

              </div>

              <img src={post.thumbnail} alt="blog-thumbnail" className="max-h-[60vh] object-cover" />
                
              <div
                  className="prose max-w-none font-medium text-neutral-700 mt-[5vh]"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

              <div className="flex flex-col w-full justify-center items-center gap-[1vw]">
                <hr className="w-full border-neutral-200 " />
                <div className="w-full flex justify-start items-center gap-[3vw]">
                  <div className="flex items-center gap-[0.3vw] cursor-pointer">
                    <HeartHandshake style={{height: '2.5vh'}} />
                    <span className="text-neutral-700 font-medium">{post.likes}</span>
                  </div>

                  <div className='flex items-center gap-[0.3vw] cursor-pointer'>
                    <img src={comments} alt="comment-logo" className='h-[2.5vh] object-cover' />
                    <span className="text-neutral-700 font-medium">{post._count.comments}</span>
                  </div>
                </div>
                <hr className="w-full border-neutral-200 " />
                </div>

              </>

            ) : (
                <p>Loading...</p>
            )}

        </div>
    )
}