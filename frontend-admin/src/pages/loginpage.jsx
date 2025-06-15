import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginpageimg from '../assets/loginpage.png';
import google from '../assets/google.png';
import { toast } from "react-hot-toast";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
            navigate("/dashboard");
          } else {
            if (data.errors && Array.isArray(data.errors)) {
            const errorMessages = data.errors.map(err => err.msg).join("\n\n");
            toast.error(errorMessages);
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

      const handleGoogleLogin = () => {
        window.location.href = "https://wordloom.onrender.com/api/auth/google?type=admin";
      };

    return(
        <div className="main-container lg:flex-row flex-col">
            <div className='lg:h-screen lg:w-[50%] h-[50vh] w-full flex flex-col justify-center items-center p-[2vh] bg-white lg:motion-preset-slide-right lg:motion-duration-500 motion-preset-slide-up motion-duration-500'>

                <div className='lg:h-[40%] h-[90%] w-full flex flex-col justify-end items-center'>
                    <p className='lg:text-[6vw] text-[6vh] text-neutral-900 font-medium '>Wordloom</p>
                    <p className='lg:text-[2.5vw] text-[2.8vh] text-neutral-800 font-medium'>Admin Privilages</p>
                    <p className='lg:text-[1.1vw] text-[1.3vh] text-neutral-700 font-medium'>© All rights reserved</p>
                </div>
                <div className='flex h-[60%] w-full justify-center items-start gap-[2vh]'>
                    <img src={loginpageimg} alt="dummy-admin-image" className='lg:h-[100%] h-[90%] object-cover'/>
                </div>
                
            </div>

            <div className='lg:h-screen lg:w-[50%] h-[50vh] w-full flex justify-center items-center p-[2vh] bg-neutral-900 lg:rounded-l-[115px] lg:rounded-tr-none sm:rounded-tl-[115px] sm:rounded-tr-[115px] rounded-tl-[70px] rounded-tr-[70px] lg:motion-preset-slide-left lg:motion-duration-500 motion-preset-slide-up motion-duration-500'>
                
                <form className='h-[80%] w-[60%] flex flex-col justify-center items-center gap-[1.5vh]' onSubmit={handleLogin}>
                    
                    <p className='lg:text-[2.3vw] text-[2.5vh] text-white'>Sign In!</p>
                    <div className='w-full flex flex-col justify-center items-start gap-1.5'>
                        <label htmlFor="email" className='lg:text-[1.3vw] sm:text-[1.5vh] text-[1.6vh] text-white'>Email:</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className='w-full p-1.5 border-2 border-gray-200 rounded-xl bg-white lg:text-[1.2vw] sm:text-[1.3vh] text-[1.4vh] text-neutral-900 font-medium focus:outline-none'/>
                    </div>
                    
                    <div className='w-full flex flex-col justify-center items-start gap-1.5'>
                        <label htmlFor="password" className='lg:text-[1.3vw] sm:text-[1.5vh] text-[1.6vh] text-white'>Password:</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className='w-full p-1.5 border-2 border-gray-200 rounded-xl bg-white text-neutral-900 font-medium lg:text-[1.2vw] sm:text-[1.3vh] text-[1.4vh] focus:outline-none'/>
                    </div>
            
                    <button type="submit"
                     disabled={loading}
                     className=" bg-neutral-950 flex justify-center items-center gap-[1vh] text-white rounded-xl hover:bg-neutral-800 w-full lg:text-[1.3vw] sm:text-[1.5vh] text-[1.6vh] font-medium p-2 lg:mt-[5vh] mt-[2vh] cursor-pointer"
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
                      "Login"
                    )}
                     </button>

                    <p className="text-white lg:text-[1.1vw] sm:text-[1.3vh] text-[1.4vh]">Or</p>
                    <button
                     type="button"
                     onClick={handleGoogleLogin}
                     className="bg-neutral-950 flex justify-center items-center gap-[1vh] lg:text-[1.3vw] sm:text-[1.5vh] text-[1.6vh] font-medium w-full text-white p-2 rounded-xl hover:bg-neutral-800 cursor-pointer"
                     >
                      <img src={google} alt="google-logo" className="lg:h-[2.5vh] h-[1.6vh] object-cover" />
                      Login with Google
                     </button>

                </form>

            </div>
        </div>
    )
}

export default Login;