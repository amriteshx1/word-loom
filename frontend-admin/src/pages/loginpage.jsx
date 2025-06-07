import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginpageimg from '../assets/loginpage.png'

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
          const res = await fetch("http://localhost:3000/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
    
          const data = await res.json();
    
          if (res.ok) {
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
          } else {
            alert(data.message || "Login failed");
          }
        } catch (err) {
          alert("Server error");
          console.error(err);
        }
      };

    return(
        <div className="main-container">
            <div className='h-screen w-[50%] flex flex-col justify-center items-center p-[2vh] bg-white'>

                <div className='h-[40%] w-full flex flex-col justify-end items-center'>
                    <p className='text-[6vw] text-neutral-900 font-medium '>Wordloom</p>
                    <p className='text-[2.5vw] text-neutral-800 font-medium'>Admin Privilages</p>
                    <p className='text-[1.1vw] text-neutral-700 font-medium'>© All rights reserved</p>
                </div>
                <div className='h-[60%] w-full flex justify-center items-start gap-[2vh]'>
                    <img src={loginpageimg} alt="dummy-admin-image" className='h-[100%]  object-cover'/>
                </div>
                
            </div>

            <div className='h-screen w-[50%] flex justify-center items-center p-[2vh] bg-neutral-900 rounded-l-[115px]'>
                
                <form className='h-[80%] w-[60%] flex flex-col justify-center items-center gap-[1.5vh]' onSubmit={handleLogin}>
                    
                    <p className='text-[2.3vw] text-white'>Sign In!</p>
                    <div className='w-full flex flex-col justify-center items-start gap-1.5'>
                        <label htmlFor="email" className='text-[1.3vw] text-white'>Email:</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className='w-full p-1.5 border-2 border-gray-200 rounded-xl bg-white text-[1.2vw] text-neutral-900 font-medium focus:outline-none'/>
                    </div>
                    
                    <div className='w-full flex flex-col justify-center items-start gap-1.5'>
                        <label htmlFor="password" className='text-[1.3vw] text-white'>Password:</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className='w-full p-1.5 border-2 border-gray-200 rounded-xl bg-white text-neutral-900 font-medium text-[1.2vw] focus:outline-none'/>
                    </div>
            
                    <button type="submit" className=" bg-white text-neutral-900 border-2 border-white rounded-xl hover:bg-neutral-200 w-[30%] text-[1.3vw] font-medium p-1 mt-[2vh] cursor-pointer">Login</button>
                </form>

            </div>
        </div>
    )
}

export default Login;