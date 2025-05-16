import React from "react";

export default function Signup({isOpen, onClose, heading = "Join Wordloom.", onSwitchToSignin}){
    if(!isOpen) return null;

    const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
   };

    return(
        <div 
        className="fixed inset-0 bg-white/93 flex justify-center items-center z-50"
        onClick={handleOverlayClick}
        >
            <div className="bg-white p-6 rounded-xl h-[90%] w-[90%] max-h-[85vh] max-w-[40vw] shadow-lg flex flex-col justify-center items-center relative">
                <button onClick={onClose} className=" absolute top-0 right-0 p-[1vh] pr-[2.5vh] cursor-pointer text-[1.5vw] text-gray-500 hover:text-gray-700">
                  x
                </button>
                <h2 className="text-[1.8vw] text-neutral-900 font-medium mb-[6vh]">{heading}</h2>

                <form className="flex flex-col justify-center items-center w-[60%] gap-[1.5vh]">
                    <div className="flex flex-col justify-center items-start gap-[0.2vh] w-full">
                        <label htmlFor="username" className="text-[1.1vw] text-neutral-900">Username</label>
                        <input type="text" id="username" required className="h-[5vh] w-full border-2 border-neutral-700 rounded-xl p-[1vh]" />
                    </div>

                    <div className="flex flex-col justify-center items-start gap-[0.2vh] w-full">
                        <label htmlFor="email" className="text-[1.1vw] text-neutral-900">Email</label>
                        <input type="email" id="email" required className="h-[5vh] w-full border-2 border-neutral-700 rounded-xl p-[1vh]"/>
                    </div>

                    <div className="flex flex-col justify-center items-start gap-[0.2vh] w-full">
                        <label htmlFor="password" className="text-[1.1vw] text-neutral-900">Password</label>
                        <input type="password" id="password" required className="h-[5vh] w-full border-2 border-neutral-700 rounded-xl p-[1vh]"/>
                    </div>

                    <div className="flex flex-col justify-center items-start gap-[0.2vh] w-full">
                        <label htmlFor="confirmPassword" className="text-[1.1vw] text-neutral-900">Confirm Password</label>
                        <input type="password" id="confirmPassword" required className="h-[5vh] w-full border-2 border-neutral-700 rounded-xl p-[1vh]"/>
                    </div>

                    <p className="text-[1vw] text-neutral-900">Already have an account? <span 
                    onClick={() => {
                         onClose(); 
                         onSwitchToSignin();
                        }} className="text-[1vw] text-neutral-950 font-medium cursor-pointer hover:underline">Sign in</span></p>

                  <button className="bg-neutral-700 w-[50%] text-white p-[1vh] pr-[2vh] pl-[2vh] rounded-xl hover:bg-neutral-800 mt-[1vh] cursor-pointer">
                    Sign up
                  </button>
                </form>
        
            </div>
        </div>
    )
}