import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import ai from '../assets/ai.png';

function Blog(){
    const { postId } = useParams();
    const navigate = useNavigate();
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [thumbnail, setThumbnail] = useState(null);
    const [tone, setTone] = useState("Keep it as it is");
    const [loadingTone, setLoadingTone] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    useEffect(() => {
      if (postId) {
        setIsEditing(true);
        const token = localStorage.getItem("token");
        fetch(`http://localhost:3000/api/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(res => res.json())
          .then(data => {
            setTitle(data.title);
            setContent(data.content);
            setThumbnail(data.thumbnail);
          })
          .catch(err => console.error("Failed to load post:", err));
      }
    }, [postId]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const wordCount = content
          .replace(/<[^>]*>/g, "")
          .trim()
          .split(/\s+/).length;
      
        if (wordCount < 120) {
          alert("Please write at least 120 words for your blog post.");
          return;
        }

        setLoadingSubmit(true);

        try {
            let imageUrl = thumbnail;

            if (thumbnail instanceof File) {
                const formData = new FormData();
                formData.append("file", thumbnail);
                formData.append("upload_preset", "blog_image_uploads");
              
                const cloudRes = await fetch("https://api.cloudinary.com/v1_1/dlfopktoi/image/upload", {
                  method: "POST",
                  body: formData,
                });
              
                const cloudData = await cloudRes.json();
                 if (!cloudData.secure_url) {
                     throw new Error("Image upload failed");
              }
                imageUrl = cloudData.secure_url;
              }

            const token = localStorage.getItem("token");
            const url = isEditing ? `http://localhost:3000/api/posts/${postId}` : "http://localhost:3000/api/posts";
            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`, },
                body: JSON.stringify({ title, content, thumbnail: imageUrl }),
              });

              if (!res.ok) {
                throw new Error("Failed to create post");
              }

              const data = await res.json();
              console.log("Post created:", data.post);
        
              if (res.ok) {
                navigate("/dashboard/posts");
              }

              setTitle("");
              setContent("");
              setThumbnail(null);
        } catch (err) {
            alert("Server error");
            console.error(err);
        } finally {
          setLoadingSubmit(false);
        }
      };

      //tone-transformation section

      const optimizeContent = async () => {
        if (tone === "Keep it as it is") return;
      
        setLoadingTone(true);
      
        try {
          const res = await fetch("http://localhost:3000/api/posts/tone/gemini/transform", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content, tone }),
          });
      
          const data = await res.json();
      
          if (res.ok) {
            setContent(data.transformed); // Update editor with new content
          } else {
            alert("Failed to optimize content.");
          }
        } catch (err) {
          console.error("AI Error:", err);
          alert("Server error while transforming content.");
        } finally {
          setLoadingTone(false);
        }
      };


    return(
      <>
       
       <div className="flex sm:hidden h-[100vh] w-full justify-center items-start bg-neutral-900 p-[2vh]">
         <p className="text-[2.3vh] mt-[15vh] text-white text-center font-semibold">
           Hey there! ✨ <br /> <br /> Writing blogs is best experienced on a bigger screen. <br /> <br />
           Switch to a tablet or desktop to craft your masterpiece! 💻📱
         </p>
       </div>


        <div className="hidden sm:flex lg:h-[150vh] h-[105vh] w-full flex-col justify-between items-center lg:gap-[5vh] gap-[2vh] bg-neutral-800 p-[2vh]">
            <div className="lg:h-[10vh] h-[7vh] w-[100%] flex flex-col justify-center items-center">
            <p className="lg:text-[2.3vw] text-[2.3vh] text-white font-bold">{isEditing ? "Edit Your Blog!" : "Craft Your New Blog!"}</p>
            <hr className="lg:w-[40%] w-[50%] border-2 border-white" />
            </div>

            <form onSubmit={handleSubmit} className="lg:h-[130vh] h-[90vh] w-[100%] flex flex-col justify-between items-center rounded-xl bg-neutral-900 p-[2vh]">
                <input type="text" maxLength={70} placeholder="Enter your blog's title" value={title} onChange={(e) => setTitle(e.target.value)} required className="lg:h-[6vh] h-[4vh] lg:w-[40%] w-[60%] p-[7px] rounded-xl bg-white lg:text-[1.1vw] text-[1.6vh] text-neutral-900 font-medium focus:outline-none" />
                <div className="flex justify-center items-center lg:gap-[1vw] gap-[1vh] h-[6vh] w-[100%]">
                  <label htmlFor="thumbnail" className="lg:text-[1.1vw] text-[1.6vh] text-white font-medium">Upload thumbnail:</label>
                  <input id="thumbnail" type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} className="text-white file:mr-3 file:py-1 file:px-2 file:border-0 file:bg-white rounded-xl file:text-neutral-900 file:font-medium" />
                </div>
                
                <Editor
                    apiKey='u5fbml5dtavsjnyloaai6j180opwm6mz7aet9a60t19vu0c5'
                    value={content}
                    init={{
                      height: 700,
                      menubar: false,
                      width: '100%',
                      plugins: [
                        'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                      ],
                      toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                    }}
                    onEditorChange={(newValue) => setContent(newValue)}
                />

                <div className="flex justify-center items-center gap-[1vh]">
                  <label htmlFor="tone" className="lg:text-[1.1vw] text-[1.6vh] text-white font-medium">Upgrade Writing-Tone: </label>
                  <select
                    name="tone"
                    id="tone"
                    className="px-[1vh] py-[0.6vh] bg-white lg:text-[1vw] text-[1.5vh] font-medium text-neutral-900 rounded-xl cursor-pointer focus:outline-none"
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                  >
                    <option value="Keep it as it is">No change</option>
                    <option value="Formal">Formal</option>
                    <option value="Casual">Casual</option>
                    <option value="Poetic">Poetic</option>
                    <option value="Witty">Witty</option>
                    <option value="Comical">Comical</option>
                  </select>
                  
                  <button
                    type="button"
                    className="flex justify-center items-center gap-1 px-[2vh] py-[0.4vh] bg-white lg:text-[1vw] text-[1.5vh] font-medium text-neutral-900 rounded-xl cursor-pointer hover:bg-neutral-200"
                    onClick={optimizeContent}
                    disabled={loadingTone}
                  >
                    {loadingTone ? "Optimizing..." : "Optimize using AI"}<img src={ai} alt="ai-powered logo" className='h-[17px] motion-grayscale-loop-100'/>
                  </button>

                </div>


                <button 
                type="submit" 
                disabled={loadingSubmit}
                className="lg:px-[7vh] px-[5vh] py-[0.75vh] bg-white p-[6px] rounded-xl lg:text-[1.2vw] text-[1.6vh] text-neutral-900 font-semibold cursor-pointer hover:bg-neutral-200">
                {loadingSubmit ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-neutral-900"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                  </>
                ) : (
                  isEditing ? "Update" : "Submit"
                )}
                </button>


            </form>
            
        </div>

      </>
    )
}

export default Blog;