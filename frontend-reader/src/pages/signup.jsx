import { useState } from "react";
import google from '../assets/google.png';

export default function Signup({isOpen, onClose, heading = "Join Wordloom.", onSwitchToSignin}){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    if(!isOpen) return null;

    const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
   };

   const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            const res = await fetch("http://localhost:3000/api/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password, confirmPassword }),
          });

          const data = await res.json();
           if (res.ok) {
            console.log(data);
            onClose();
            onSwitchToSignin();
          } else {
           console.error("❌ Validation Errors:", data.errors);
          }
            
        } catch  (err) {
          alert("Server error");
          console.error(err);
        }
    };

    const handleGoogleLogin = () => {
      window.location.href = "http://localhost:3000/api/auth/google";
    };


    return(
        <div 
        className="fixed inset-0 bg-white/93 flex justify-center items-center z-50"
        onClick={handleOverlayClick}
        >
            <div className="bg-white p-6 rounded-xl h-[90%] w-[90%] lg:max-h-[85vh] lg:max-w-[40vw] max-h-[70vh] sm:max-w-[70vw] max-w-[85vw] shadow-lg flex flex-col justify-center items-center relative motion-preset-slide-up motion-duration-500">
                <button onClick={onClose} className=" absolute top-0 right-0 p-[1vh] pr-[2.5vh] cursor-pointer lg:text-[1.5vw] text-[1.8vh] text-gray-500 hover:text-gray-700">
                  x
                </button>
                <h2 className="lg:text-[1.8vw] sm:text-[2.2vh] text-[2vh] text-neutral-900 font-medium mb-[5vh]">{heading}</h2>

                <form className="flex flex-col justify-center items-center lg:w-[60%] w-[80%] gap-[1.5vh]" onSubmit={handleSubmit}>
                    <div className="flex flex-col justify-center items-start gap-[0.2vh] w-full">
                        <label htmlFor="username" className="lg:text-[1.1vw] text-[1.4vh] text-neutral-900">Username</label>
                        <input type="text" id="username" required 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="lg:h-[5vh] h-[3.5vh] w-full border-2 border-neutral-700 rounded-xl p-[1vh] focus:outline-none" />
                    </div>

                    <div className="flex flex-col justify-center items-start gap-[0.2vh] w-full">
                        <label htmlFor="email" className="lg:text-[1.1vw] text-[1.4vh] text-neutral-900">Email</label>
                        <input type="email" id="email" required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="lg:h-[5vh] h-[3.5vh] w-full border-2 border-neutral-700 rounded-xl p-[1vh] focus:outline-none" />
                    </div>

                    <div className="flex flex-col justify-center items-start gap-[0.2vh] w-full">
                        <label htmlFor="password" className="lg:text-[1.1vw] text-[1.4vh] text-neutral-900">Password</label>
                        <input type="password" id="password" required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="lg:h-[5vh] h-[3.5vh] w-full border-2 border-neutral-700 rounded-xl p-[1vh] focus:outline-none" />
                    </div>

                    <div className="flex flex-col justify-center items-start gap-[0.2vh] w-full">
                        <label htmlFor="confirmPassword" className="lg:text-[1.1vw] text-[1.4vh] text-neutral-900">Confirm Password</label>
                        <input type="password" id="confirmPassword" required 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="lg:h-[5vh] h-[3.5vh] w-full border-2 border-neutral-700 rounded-xl p-[1vh] focus:outline-none" />
                    </div>

                    <p className="lg:text-[1vw] text-[1.1vh] text-neutral-900">Already have an account? <span 
                    onClick={() => {
                         onClose(); 
                         onSwitchToSignin();
                        }} className="lg:text-[1vw] text-[1.1vh] text-neutral-950 font-medium cursor-pointer hover:underline">Sign in</span></p>

                  <button type="submit" className="bg-neutral-700 lg:text-[1.1vw] text-[1.4vh] w-full text-white p-[1vh] pr-[2vh] pl-[2vh] rounded-xl hover:bg-neutral-800 mt-[1vh] cursor-pointer">
                    Sign up
                  </button>
                  <p className="lg:text-[1vw] text-[1.2vh] text-neutral-900">Or</p>
                   <button
                   type="button"
                   onClick={handleGoogleLogin}
                   className="bg-neutral-700 flex justify-center items-center gap-[1vh] lg:text-[1.1vw] text-[1.4vh] w-full text-white p-[1vh] pr-[2vh] pl-[2vh] rounded-xl hover:bg-neutral-800 mt-[1vh] cursor-pointer"
                   >
                    <img src={google} alt="google-logo" className="lg:h-[2.5vh] h-[1.6vh] object-cover" />
                    Sign up with Google
                   </button>
                </form>
        
            </div>
        </div>
    )
}