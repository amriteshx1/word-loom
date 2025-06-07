import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { HeartHandshake } from '../components/blogLike';
import commentLogo from '../assets/comments.png';
import commentUser from '../assets/commentUser.png';

export default function Post(){
  const [post, setPost] = useState(null);
  const [clickedId, setClickedId] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const {id} = useParams();

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
        fetch(`http://localhost:3000/api/posts/${id}`, { headers }),
        fetch(`http://localhost:3000/api/posts/${id}/comments`, { headers }),
      ]);

      const postData = await postRes.json();
      const commentsData = await commentsRes.json();
      setPost(postData);
      setComments(commentsData);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  fetchPostAndComments();
}, [id]);


  //increase blog likes
    const increaseLike = async (id) => {
      setClickedId(id);
      setTimeout(() => setClickedId(null), 120); 

      const token = localStorage.getItem("token");
      await fetch(`http://localhost:3000/api/posts/${id}/like`, {
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
     if (!newComment.trim()) return;
    
     const token = localStorage.getItem("token");
     const res = await fetch(`http://localhost:3000/api/posts/${id}/comments`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`,
       },
       body: JSON.stringify({ content: newComment }),
     });
    
     const data = await res.json();
     console.log(data);
     setComments((prev) => [...prev, data.comment]);
     setNewComment("");
     setPost((prevPost) => ({
    ...prevPost,
    _count: {
      ...prevPost._count,
      comments: prevPost._count.comments + 1,
    },
    }));
    };


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
                  <div onClick={() => increaseLike(post.id)} className= {`flex items-center gap-[0.2vw] cursor-pointer transition-transform duration-150 ${
                      clickedId === post.id ? 'scale-90' : ''}`}>
                    <HeartHandshake style={{height: '2.5vh'}} />
                    <span className="text-neutral-700 font-medium">{post.likes}</span>
                  </div>

                  <div className='flex items-center gap-[0.3vw] cursor-pointer'>
                    <img src={commentLogo} alt="comment-logo" className='h-[2.5vh] object-cover' />
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
                  <div onClick={() => increaseLike(post.id)} className= {`flex items-center gap-[0.2vw] cursor-pointer transition-transform duration-150 ${
                    clickedId === post.id ? 'scale-90' : ''}`}>
                    <HeartHandshake style={{height: '2.5vh'}} />
                    <span className="text-neutral-700 font-medium">{post.likes}</span>
                  </div>

                  <div className='flex items-center gap-[0.3vw] cursor-pointer'>
                    <img src={commentLogo} alt="comment-logo" className='h-[2.5vh] object-cover' />
                    <span className="text-neutral-700 font-medium">{post._count.comments}</span>
                  </div>
                </div>
                <hr className="w-full border-neutral-200 " />
                </div>

                <p className="text-[1.5vw] text-neutral-700 font-medium self-start">Responses ({post._count.comments})</p>

                <div className="w-full flex justify-between items-center">
                  <textarea className="w-[80%] border border-neutral-300 rounded-2xl p-[1vh]" rows={2} placeholder="What are your thoughts?" value={newComment} onChange={(e) => setNewComment(e.target.value)}></textarea>
                  <button onClick={handleAddComment} className="px-[2vh] py-[1vh] bg-neutral-700 text-white rounded-2xl hover:bg-neutral-800 cursor-pointer">Respond</button>
                </div>
                
                <div className="flex flex-col w-full justify-start items-center gap-[5vh]">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex flex-col justify-start items-start w-full gap-[1vh]">
                      <div className="flex justify-start items-center gap-[1vh]">
                        <img src={commentUser} alt="user-comment logo" className="h-[3vh]" />
                        <p className="text-[1.1vw] text-neutral-900 font-medium">{comment.author.username}</p>
                      </div>
                  
                      <p className="text-[1vw] text-neutral-700">{comment.content}</p>

                    </div>
                  ) )}

                </div>

              </>

            ) : (
                <p>Loading...</p>
            )}

        </div>
    )
}