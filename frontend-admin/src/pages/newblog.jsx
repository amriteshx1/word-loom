import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";


function Blog(){
    const { postId } = useParams();
    const navigate = useNavigate();
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [thumbnail, setThumbnail] = useState(null);

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
        }
      };

    return(
        <div className="h-screen w-full flex flex-col justify-between items-center  bg-gray-200 p-[2vh]">
            <div className="w-[100%] flex flex-col justify-center items-center">
            <p className="text-[2.3vw] text-gray-700 font-bold">{isEditing ? "Edit Your Blog!" : "Craft Your New Blog!"}</p>
            <hr className="w-[40%] border-2 border-gray-700" />
            </div>

            <form onSubmit={handleSubmit} className="h-[90%] w-[100%] flex flex-col justify-around items-center gap-[2vh] border-3 border-gray-700 rounded-xl bg-gray-700 p-[1vh]">
                <input type="text" placeholder="Enter your blog's title" value={title} onChange={(e) => setTitle(e.target.value)} required className="h-[6vh] w-[40%] p-[7px] rounded-xl bg-white text-[1.1vw] text-gray-700 font-medium" />
                <div className="flex justify-center items-center gap-[1vw] h-[6vh] w-[100%]">
                  <label htmlFor="thumbnail" className="text-[1.1vw] text-white font-medium">Upload thumbnail:</label>
                  <input id="thumbnail" type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} className="file:mr-3 file:py-1 file:px-2 file:border-0 file:bg-white rounded-xl file:text-gray-700" />
                </div>
                
                <Editor
                    apiKey='u5fbml5dtavsjnyloaai6j180opwm6mz7aet9a60t19vu0c5'
                    value={content}
                    init={{
                      height: 500,
                      menubar: false,
                      width: '100%',
                      plugins: [
                        'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                      ],
                      toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                    }}
                    onEditorChange={(newValue) => setContent(newValue)}
                />

                <button type="submit" className="h-[5vh] w-[15%] bg-white p-[6px] rounded-xl text-[1.2vw] text-gray-700 font-medium cursor-pointer">{isEditing ? "Update" : "Submit"}</button>


            </form>
            
        </div>
    )
}

export default Blog;