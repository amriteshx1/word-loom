import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";


function Blog(){
    const { postId } = useParams();
    const navigate = useNavigate();
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isEditing, setIsEditing] = useState(false);

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
          })
          .catch(err => console.error("Failed to load post:", err));
      }
    }, [postId]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const url = isEditing ? `http://localhost:3000/api/posts/${postId}` : "http://localhost:3000/api/posts";
            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`, },
                body: JSON.stringify({ title, content }),
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
        } catch (err) {
            alert("Server error");
            console.error(err);
        }
      };

    return(
        <div className="h-screen w-full flex flex-col justify-around items-center  bg-gray-200 p-[3vh]">
            <div className="w-[100%] flex flex-col justify-center items-center">
            <p className="text-[2.3vw] text-gray-700 font-bold">{isEditing ? "Edit Your Blog!" : "Craft Your New Blog!"}</p>
            <hr className="w-[40%] border-2 border-gray-700" />
            </div>

            <form onSubmit={handleSubmit} className="h-[80%] w-[90%] flex flex-col justify-around items-center gap-[2vh] border-3 border-gray-700 rounded-xl bg-gray-700">
                <input type="text" placeholder="Enter your blog's title" value={title} onChange={(e) => setTitle(e.target.value)} required className="h-[6vh] w-[40%] p-[7px] rounded-xl bg-white text-[1.1vw] text-gray-700 font-medium" />

                <Editor
                    apiKey='u5fbml5dtavsjnyloaai6j180opwm6mz7aet9a60t19vu0c5'
                    value={content}
                    init={{
                      height: 400,
                      menubar: false,
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