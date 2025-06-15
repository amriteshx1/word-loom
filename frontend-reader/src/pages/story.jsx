import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Signup from './signup';
import Signin from './signin';

export default function Story(){
    const [showSignup, setShowSignup] = useState(false);
    const [showSignin, setShowSignin] = useState(false);
    const [signupHeading, setSignupHeading] = useState("Join Wordloom.");
    const navigate = useNavigate();

    const handleLogo = () => {
      navigate("/");
    }

    return(
        <div className="main-container overflow-y-auto flex-col bg-neutral-700 motion-preset-slide-up motion-duration-500">
            <div className="h-[11vh] w-full flex justify-between items-center border-b-2 border-b-zinc-100 p-[2vh]">
                <p onClick={handleLogo} className='lg:text-[2.1vw] sm:text-[2.4vh] text-[3vh] font-medium cursor-pointer text-white'>Wordloom.</p>
                <div className="w-[50%] flex justify-end items-center gap-[2vh]">
                    <button onClick={() => setShowSignin(true)} className="px-4 py-1 lg:text-[1.1vw] text-[1.1vh] rounded-full cursor-pointer bg-neutral-700 text-zinc-100 border border-white">Sign in</button>
                    <button
                    onClick={() => {
                      setSignupHeading("Join Wordloom.");
                      setShowSignup(true);
                    }} 
                    className="px-4 py-1 lg:text-[1.1vw] text-[1.1vh] rounded-full cursor-pointer bg-zinc-100 text-neutral-700 hover:bg-white">Sign up</button>
                </div>

            </div>

            <div className="min-h-[100vh] w-full flex flex-col justify-start items-start">
                <div className="lg:w-[65%] w-full flex flex-col justify-start items-start text-neutral-200 gap-[4vh] px-6 py-15">
                    <p className="lg:text-[6vw] text-[5vh] font-semibold text-neutral-100">Everyone has something worth sharing.</p>
                    <p className="lg:text-[1.7vw] text-[1.6vh] font-medium">A thought, an experience, a perspective that might speak to someone else in ways we don't even realize. 
                        That’s what Wordloom is about - giving space to words that matter, and to people who want to say something real.</p>
                    <p className="lg:text-[1.7vw] text-[1.6vh] font-medium">In a world overflowing with content, we’re keeping things simple. No noise, no distractions - just blogs that feel personal, honest, and intentional.
                         Whether it’s tech or marketing, culture or life itself, every post here is someone choosing to put a piece of themselves out there.</p>
                    <p className="lg:text-[1.7vw] text-[1.6vh] font-medium">We believe in slow reading, thoughtful writing, and depth over buzz.</p>
                    <p className="lg:text-[1.7vw] text-[1.6vh] font-medium"><mark className="bg-neutral-200 text-neutral-700">You don’t need to be famous to be heard. You just need something to say.</mark></p>
                    <p className="lg:text-[1.7vw] text-[1.6vh] font-medium"><mark className="bg-neutral-200 text-neutral-700">And someone will read it - maybe not thousands, but someone who truly needed it.</mark></p>
                    <p className="lg:text-[1.7vw] text-[1.6vh] font-medium">Wordloom is still young. This is just our beginning. <br />
                       We’re already dreaming up what comes next with Version 2 - but for now, we’re here.</p>
                    <p className="lg:text-[1.7vw] text-[1.6vh] font-medium italic">Rooted. Real. Writing the start of a journey we’re proud to share.</p>
                </div>

                <div className="w-full flex flex-col justify-start items-start text-neutral-200">
                    <button
                     onClick={() => {
                       setSignupHeading("Join Wordloom.");
                       setShowSignup(true);
                     }} 
                     className="lg:text-[5vw] text-[3.5vh] px-6 py-6 border-y border-y-zinc-100 w-full text-start flex justify-between items-center hover:bg-neutral-200 hover:text-neutral-700 cursor-pointer transition-colors duration-400">Start Reading <span>&rarr;</span></button>
                    <button
                     onClick={() => {
                      setSignupHeading("Create an account to start writing.");
                      setShowSignup(true);
                     }}
                     className="lg:text-[5vw] text-[3.5vh] px-6 py-6 border-y border-y-zinc-100 w-full text-start flex justify-between items-center hover:bg-neutral-200 hover:text-neutral-700 cursor-pointer transition-colors duration-400">Start Writing <span>&rarr;</span></button>
                </div>

                <div className="h-[10vh] w-full flex justify-between items-center p-[2vh] bg-neutral-200 text-neutral-700">
                    <p onClick={handleLogo} className='lg:text-[2.1vw] sm:text-[2.4vh] text-[3vh] cursor-pointer font-medium'>Wordloom.</p>
                    <div className="w-[50%] flex justify-end items-center gap-[2vh]">
                        <p className='lg:text-[0.9vw] text-[1vh]  text-neutral-700 cursor-pointer  hover:text-neutral-500'>Help</p>
                        <p className='lg:text-[0.9vw] text-[1vh]  text-neutral-700 cursor-pointer  hover:text-neutral-500'>About</p>
                        <p className='lg:text-[0.9vw] text-[1vh]  text-neutral-700 cursor-pointer  hover:text-neutral-500'>Privacy</p>
                        <p className='lg:text-[0.9vw] text-[1vh]  text-neutral-700 cursor-pointer  hover:text-neutral-500'>Terms</p>
                    </div>

                </div>

            </div>

        <Signup isOpen={showSignup} onClose={() => setShowSignup(false)} heading={signupHeading} onSwitchToSignin={() => setShowSignin(true)} />
                    
        <Signin isOpen={showSignin} onClose={() => setShowSignin(false)} onSwitchToSignUp={() => setShowSignup(true)} />

        </div>
    )
}