import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { HeartHandshake } from '../components/blogLike';
import commentLogo from '../assets/comments.png';
import commentUser from '../assets/commentUser.png';
import { formatDistanceToNow } from 'date-fns';
import { ChevronsRight } from "../components/more";
import {useNavigate } from "react-router-dom";
import share from '../assets/share.png';
import { toast } from 'react-hot-toast';

export default function Post(){
  const [post, setPost] = useState(null);
  const [clickedId, setClickedId] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const {id} = useParams();
  const navigate = useNavigate();

 useEffect(() => {
  if (!id) return;

  const fetchPostAndComments = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      const [postRes, commentsRes] = await Promise.all([
        fetch(`https://wordloom.onrender.com/api/posts/${id}`, { headers }),
        fetch(`https://wordloom.onrender.com/api/posts/${id}/comments`, { headers }),
      ]);

      const postData = await postRes.json();
      const commentsData = await commentsRes.json();
      setPost(postData);
      setComments(commentsData);
    } catch (err) {
      console.error("Error fetching data:", err);
      toast.error("Failed to load post and comments.");
    }
  };

  fetchPostAndComments();
}, [id]);


  //increase blog likes
    const increaseLike = async (id) => {
      setClickedId(id);
      setTimeout(() => setClickedId(null), 120); 

      const token = localStorage.getItem("token");
      await fetch(`https://wordloom.onrender.com/api/posts/${id}/like`, {
       method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    setPost(prevPost => ({
      ...prevPost,
      likes: prevPost.likes + 1
    }));
    }

    //post new comment
    const handleAddComment = async () => {
      if (!newComment.trim()) {
        toast.error("Comment can't be empty.");
        return;
      }
    
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`https://wordloom.onrender.com/api/posts/${id}/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ content: newComment }),
        });
    
        const data = await res.json();
    
        if (res.ok) {
          setComments((prev) => [...prev, data.comment]);
          setNewComment("");
          setPost((prevPost) => ({
            ...prevPost,
            _count: {
              ...prevPost._count,
              comments: prevPost._count.comments + 1,
            },
          }));
          toast.success("Comment posted!");
        } else {
          toast.error(data.error || "Failed to post comment.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Server error while posting comment.");
      }
    };

    //sharing feature
    const handleShare = async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: post.title,
            text: "Check out this blog!",
            url: window.location.href,
          });
        } catch (err) {
          console.error("Error sharing:", err);
        }
      } else {
        try {
          await navigator.clipboard.writeText(window.location.href);
          toast.success("Link copied to clipboard!");
        } catch (err) {
          toast.error("Failed to copy link.");
        }
      }
    };

    return(
        <div className="h-[91vh] lg:w-[50%] sm:w-[70%] w-[80%] flex flex-col justify-start items-center lg:gap-[5vh] gap-[4vh] motion-preset-slide-up motion-duration-500">
        
            {post ? (
              <>
              <div className="max-h-[50%] w-full flex flex-col justify-start items-start lg:mt-[10vh] mt-[5vh] gap-[3vh]">
                <p className="lg:text-[3vw] text-[3vh] text-neutral-700 font-bold">{post.title}</p>
                <p className="lg:text-[1.2vw] sm:text-[1.2vh] text-[1.5vh] text-neutral-700 font-medium">By <span className="lg:text-[1.3vw] sm:text-[1.3vh] text-[1.6vh] text-neutral-700 font-semibold">{post.author.username} </span>
                • {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}</p>
                  
                <div className="flex flex-col w-full justify-center items-center gap-[1vw]">
                <hr className="w-full border-neutral-200 " />
                <div className="w-full flex justify-between items-center">
                  <div className="w-[50%] flex justify-start items-center gap-[3vw]">
                  <div onClick={() => increaseLike(post.id)} className= {`flex items-center gap-[0.2vw] cursor-pointer transition-transform duration-150 ${
                      clickedId === post.id ? 'scale-90' : ''}`}>
                    <HeartHandshake className="lg:h-[2.5vh] sm:h-[1.9vh] h-[1.7vh]" />
                    <span className="text-neutral-700 lg:text-[1vw] sm:text-[1.2vh] text-[1.4vh] font-medium">{post.likes}</span>
                  </div>

                  <div className='flex items-center lg:gap-[0.3vw] sm:gap-[0.2vh] gap-[0.5vh] cursor-pointer'>
                    <img src={commentLogo} alt="comment-logo" className='lg:h-[2.5vh] sm:h-[1.9vh] h-[1.7vh] object-cover' />
                    <span className="text-neutral-700 lg:text-[1vw] sm:text-[1.2vh] text-[1.4vh] font-medium">{post._count.comments}</span>
                  </div>
                  </div>

                  <div onClick={handleShare} className="w-[30%] flex justify-end items-center mr-[1vh]">
                    <img src={share} alt="share-button" className="lg:h-[2.6vh] sm:h-[1.9vh] h-[1.7vh] object-cover cursor-pointer" />
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
                <div className="w-full flex justify-between items-center">
                  <div className="w-[50%] flex justify-start items-center gap-[3vw]">
                  <div onClick={() => increaseLike(post.id)} className= {`flex items-center gap-[0.2vw] cursor-pointer transition-transform duration-150 ${
                    clickedId === post.id ? 'scale-90' : ''}`}>
                    <HeartHandshake className="lg:h-[2.5vh] sm:h-[1.9vh] h-[1.7vh]" />
                    <span className="text-neutral-700 lg:text-[1vw] sm:text-[1.2vh] text-[1.4vh] font-medium">{post.likes}</span>
                  </div>

                  <div className='flex items-center lg:gap-[0.3vw] sm:gap-[0.2vh] gap-[0.5vh] cursor-pointer'>
                    <img src={commentLogo} alt="comment-logo" className='lg:h-[2.5vh] sm:h-[1.9vh] h-[1.7vh] object-cover' />
                    <span className="text-neutral-700 lg:text-[1vw] sm:text-[1.2vh] text-[1.4vh] font-medium">{post._count.comments}</span>
                  </div>
                  </div>

                  <div className="w-[30%] flex justify-end items-center mr-[1vh]">
                    <img onClick={handleShare} src={share} alt="share-button" className="lg:h-[2.6vh] sm:h-[1.9vh] h-[1.7vh] object-cover cursor-pointer" />
                  </div>
                </div>
                <hr className="w-full border-neutral-200 " />
                </div>

                <p className="lg:text-[1.5vw] sm:text-[1.6vh] text-[1.7vh] text-neutral-700 font-medium self-start">Responses ({post._count.comments})</p>

                <div className="w-full flex justify-between items-center">
                  <textarea className="lg:w-[80%] w-[65%] lg:text-[1.1vw] text-[1.1vh] border border-neutral-300 rounded-2xl p-[1vh]" rows={2} placeholder="What are your thoughts?" value={newComment} onChange={(e) => setNewComment(e.target.value)}></textarea>
                  <button onClick={handleAddComment} className="px-[2vh] py-[1vh] lg:text-[1vw] text-[1.1vh] bg-neutral-700 text-white rounded-2xl hover:bg-neutral-800 cursor-pointer">Respond</button>
                </div>
                
                <div className="flex flex-col w-full justify-start items-center lg:gap-[5vh] gap-[4vh]">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex flex-col justify-start items-start w-full gap-[1vh]">
                      <div className="flex justify-start items-center gap-[1vh]">
                        <img src={commentUser} alt="user-comment logo" className="lg:h-[5.2vh] sm:h-[3vh] h-[3.3vh]" />
                        <div className="flex flex-col justify-start items-start">
                          <p className="lg:text-[1vw] sm:text-[1vh] text-[1.1vh] text-neutral-900 font-medium">{comment.author.username}</p>
                          <p className="lg:text-[0.8vw] sm:text-[0.9vh] text-[1vh] text-neutral-500">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</p>
                        </div>
                      </div>
                  
                      <p className="lg:text-[1vw] sm:text-[1.1vh] text-[1.2vh] text-neutral-700 font-medium">{comment.content}</p>

                    </div>
                  ) )}

                </div>

                <div className="flex justify-center items-center">
                  <div onClick={() => navigate("/feed")} className="flex px-[2vh] py-[1vh] bg-neutral-700 mb-[5vh] text-white rounded-2xl cursor-pointer hover:bg-neutral-800">
                    <p className="lg:text-[1.1vw] sm:text-[1.3vh] text-[1.4vh]">Read more</p>
                    <ChevronsRight className="lg:h-[2.7vh] h-[2vh]" />
                  </div>
                </div>

              </>

            ) : (
                <div className="w-full mt-[5vh] flex flex-col justify-start items-start gap-[3vh] animate-pulse">
                <div className="h-[3.5vh] w-[80%] bg-neutral-300 rounded" />
                <div className="h-[2.5vh] w-[60%] bg-neutral-300 rounded" />

                <div className="w-full flex flex-col justify-center items-center gap-[1vw] mt-[1vh]">
                  <hr className="w-full border-neutral-200" />
                  <div className="w-full flex justify-between items-center">
                    <div className="w-[50%] flex gap-[3vw]">
                      <div className="h-[2.5vh] w-[5vw] bg-neutral-300 rounded" />
                      <div className="h-[2.5vh] w-[5vw] bg-neutral-300 rounded" />
                    </div>
                    <div className="w-[30%] flex justify-end">
                      <div className="h-[2.5vh] w-[3vw] bg-neutral-300 rounded" />
                    </div>
                  </div>
                  <hr className="w-full border-neutral-200" />
                </div>
              
                <div className="w-full h-[40vh] bg-neutral-300 rounded-lg" />
              
                <div className="w-full flex flex-col gap-[1.5vh] mt-[2vh]">
                  <div className="h-[2.2vh] w-[90%] bg-neutral-200 rounded" />
                  <div className="h-[2.2vh] w-[85%] bg-neutral-200 rounded" />
                  <div className="h-[2.2vh] w-[80%] bg-neutral-200 rounded" />
                  <div className="h-[2.2vh] w-[75%] bg-neutral-200 rounded" />
                </div>
              </div>

            )}

        </div>
    )
}