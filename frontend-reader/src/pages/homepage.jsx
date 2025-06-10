import { useState } from 'react';
import Signin from './signin';
import Signup from './signup';
import homeimg from '../assets/homeimg.png';
import ai from '../assets/ai.png'

function Homepage(){
    const [showSignup, setShowSignup] = useState(false);
    const [showSignin, setShowSignin] = useState(false);
    const [signupHeading, setSignupHeading] = useState("Join Wordloom.");


    return(
        <div className="main-container flex-col lg:px-[10vh] px-[2vh] overflow-hidden">

            <div className='lg:h-[10vh] h-[9vh]  w-full flex justify-between items-center bg-neutral-700 text-zinc-100 p-[2vh] rounded-b-4xl motion-preset-slide-down motion-duration-500'>
                <div className='lg:w-[60%] w-[40%] flex justify-start items-center'>
                    <p className='lg:text-[2vw] sm:text-[2.4vh] text-[3vh] font-medium'>Wordloom.</p>
                </div>

                <div className='lg:w-[40%] w-[60%] flex sm:justify-around justify-end items-center'>
                    <p className='hidden sm:block lg:text-[1.1vw] text-[1.2vh] font-medium'>Our Story</p>
                    <p className='hidden sm:block lg:text-[1.1vw] text-[1.2vh] font-medium'>Membership</p>
                    <button
                    onClick={() => {
                      setSignupHeading("Create an account to start writing.");
                      setShowSignup(true);}}
                     className='hidden lg:text-[1.1vw] text-[1.2vh] sm:flex justify-center items-center gap-[2px] font-medium cursor-pointer hover:text-zinc-200'>Write <img src={ai} alt="ai-powered logo" className='h-[20px] motion-grayscale-loop-100'/></button>
                    <button onClick={() => setShowSignin(true)} className='hidden sm:block lg:text-[1.1vw] text-[1.2vh] font-medium cursor-pointer hover:text-zinc-200'>Sign in</button>
                    <button
                    onClick={() => {
                        setSignupHeading("Join Wordloom.");
                        setShowSignup(true);}}
                    className='lg:text-[1vw] sm:text-[1.2vh] text-[1.5vh] font-medium  lg:p-[1vh] lg:px-[2vh] sm:p-[0.5vh] sm:px-[0.9vh] p-[0.8vh] px-[1.5vh] rounded-4xl bg-zinc-100 text-neutral-700 cursor-pointer hover:bg-zinc-200'>Get started</button>
                </div>

            </div>

            <div className='h-[60vh] w-full flex lg:justify-between justify-start items-center'>

                <div className='h-full w-full flex flex-col justify-center items-start gap-[25px] motion-preset-slide-right motion-duration-500 motion-delay-500'>
                <p className='lg:text-[6vw] text-[7vh] font-bold bg-gradient-to-tl from-neutral-950 via-zinc-500 to-neutral-700 bg-clip-text text-transparent'>Weave thoughts <br /> into words</p>
                <p className='lg:text-[1.8vw] text-[2.2vh] font-medium bg-gradient-to-tl from-neutral-950 via-zinc-500 to-neutral-700 bg-clip-text text-transparent'>A space to write, reflect, and connect with meaning!</p>
                <button 
                onClick={() => {
                    setSignupHeading("Join Wordloom.");
                    setShowSignup(true);}}
                className='lg:text-[1.4vw] text-[1.7vh] font-medium bg-neutral-700 lg:w-[13vw] w-[17vh] p-[1vh] rounded-4xl text-zinc-100 cursor-pointer hover:bg-neutral-800 lg:motion-preset-seesaw-sm lg:motion-delay-2000'>Start reading</button>
                </div>

                <img src={homeimg} alt="home img" className='hidden lg:block h-[60vh] object-cover motion-preset-slide-left motion-duration-500 motion-delay-500' />

            </div>

            <div className='h-[10vh] sm:w-[40%] w-[50%] flex flex-col justify-end items-center motion-preset-slide-up motion-duration-500 motion-delay-1000'>
                <hr className='w-full border-solid border-neutral-700 border-[0.5]' />
                <div className='h-[50%] w-full flex justify-center items-center gap-[2vw] text-neutral-700 font-normal'>
                    <p className='lg:text-[0.8vw] text-[1.2vh] cursor-pointer hover:text-neutral-500'>Help</p>
                    <p className='lg:text-[0.8vw] text-[1.2vh] cursor-pointer hover:text-neutral-500'>About</p>
                    <p className='hidden lg:block lg:text-[0.8vw] text-[1.2vh] cursor-pointer hover:text-neutral-500'>Careers</p>
                    <p className='hidden lg:block lg:text-[0.8vw] text-[1.2vh] cursor-pointer hover:text-neutral-500'>Blog</p>
                    <p className='lg:text-[0.8vw] text-[1.2vh] cursor-pointer hover:text-neutral-500'>Privacy</p>
                    <p className='hidden lg:block lg:text-[0.8vw] text-[1.2vh] cursor-pointer hover:text-neutral-500'>Rules</p>
                    <p className='lg:text-[0.8vw] text-[1.2vh] cursor-pointer hover:text-neutral-500'>Terms</p>

                </div>


            </div>

            <Signup isOpen={showSignup} onClose={() => setShowSignup(false)} heading={signupHeading} onSwitchToSignin={() => setShowSignin(true)} />
            
            <Signin isOpen={showSignin} onClose={() => setShowSignin(false)} onSwitchToSignUp={() => setShowSignup(true)} />
            
        </div>
    )
}

export default Homepage;