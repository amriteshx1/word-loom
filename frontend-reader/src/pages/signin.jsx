import { useState } from "react";
import { useNavigate } from "react-router-dom";
import google from '../assets/google.png';
import { toast } from "react-hot-toast";

export default function Signin({isOpen, onClose, onSwitchToSignUp}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    if(!isOpen) return null;

    const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
   };

   const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
          const res = await fetch("https://wordloom.onrender.com/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
    
          const data = await res.json();
    
          if (res.ok) {
            localStorage.setItem("token", data.token);
            toast.success("Signed in successfully!");
            navigate("/feed");
          } else {
            if (data.errors && Array.isArray(data.errors)) {
              data.errors.forEach((err) => toast.error(err.msg));
            } else {
              toast.error(data.error || "Login failed");
            }
          }
        } catch (err) {
          toast.error("Server error. Please try again.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      const handleGoogleLogin2 = () => {
        window.location.href = "https://wordloom.onrender.com/api/auth/google";
      };

    return (
        <div 
        className="fixed inset-0 bg-white/93 flex justify-center items-center z-50"
        onClick={handleOverlayClick}
        >
             <div className="bg-white p-6 rounded-xl h-[90%] w-[90%] lg:max-h-[85vh] lg:max-w-[40vw] max-h-[70vh] sm:max-w-[70vw] max-w-[85vw] shadow-lg flex flex-col justify-center items-center relative motion-preset-slide-up motion-duration-500">
                <button onClick={onClose} className=" absolute top-0 right-0 p-[1vh] pr-[2.5vh] cursor-pointer lg:text-[1.5vw] text-[1.8vh] text-gray-500 hover:text-gray-700">
                  x
                </button>
                <h2 className="lg:text-[1.8vw] sm:text-[2.2vh] text-[2vh] text-neutral-900 font-medium mb-[5vh]">Welcome back.</h2>

                <form className="flex flex-col justify-center items-center lg:w-[60%] w-[80%] gap-[1.5vh]" onSubmit={handleLogin}>

                    <div className="flex flex-col justify-center items-start gap-[0.2vh] w-full">
                        <label htmlFor="email" className="lg:text-[1.1vw] text-[1.4vh] text-neutral-900">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="lg:h-[5vh] h-[3.5vh] w-full border-2 border-neutral-700 rounded-xl p-[1vh] focus:outline-none"/>
                    </div>

                    <div className="flex flex-col justify-center items-start gap-[0.2vh] w-full">
                        <label htmlFor="password" className="lg:text-[1.1vw] text-[1.4vh] text-neutral-900">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="lg:h-[5vh] h-[3.5vh] w-full border-2 border-neutral-700 rounded-xl p-[1vh] focus:outline-none"/>
                    </div>

                    <p className="lg:text-[1vw] text-[1.1vh] text-neutral-900">No account? <span
                    onClick={() => {
                      onClose();
                      onSwitchToSignUp();
                    }} className="lg:text-[1vw] text-[1.1vh] text-neutral-950 font-medium cursor-pointer hover:underline">Create one</span></p>

                  <button type="submit"
                   disabled={loading} 
                   className="bg-neutral-700 flex justify-center items-center gap-[1vh] lg:text-[1.1vw] text-[1.4vh] w-full  text-white p-[1vh] pr-[2vh] pl-[2vh] rounded-xl hover:bg-neutral-800 lg:mt-[2vh] mt-[1vh] cursor-pointer"
                   >
                    {loading ? (
                     <>
                       <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
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
                     "Sign in"
                   )}
                  </button>

                  <p className="lg:text-[1vw] text-[1.2vh] text-neutral-900">Or</p>
                   <button
                   type="button"
                   onClick={handleGoogleLogin2}
                   className="bg-neutral-700 flex justify-center items-center gap-[1vh] lg:text-[1.1vw] text-[1.4vh] w-full text-white p-[1vh] pr-[2vh] pl-[2vh] rounded-xl hover:bg-neutral-800 cursor-pointer"
                   >
                    <img src={google} alt="google-logo" className="lg:h-[2.5vh] h-[1.6vh] object-cover" />
                    Sign in with Google
                   </button>
                </form>

             </div>
            
        </div>
    )
};