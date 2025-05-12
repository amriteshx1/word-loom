import homeimg from '../assets/homeimg.png';

function Homepage(){
    return(
        <div className="main-container flex-col pr-[10vh] pl-[10vh]">

            <div className='h-[10vh] w-full flex justify-between items-center bg-neutral-700 text-zinc-100 p-[2vh] rounded-b-4xl'>
                <div className='w-[65%] flex justify-start items-center'>
                    <p className='text-[2vw] font-medium'>Wordloom.</p>
                </div>

                <div className='w-[35%] flex justify-around items-center'>
                    <p className='text-[1.1vw] font-medium'>Our Story</p>
                    <p className='text-[1.1vw] font-medium'>Membership</p>
                    <p className='text-[1.1vw] font-medium'>Sign in</p>
                    <button className='text-[1vw] font-medium  p-[1vh] pr-[2vh] pl-[2vh] rounded-4xl bg-zinc-100 text-neutral-700 cursor-pointer hover:bg-zinc-200'>Get started</button>
                </div>

            </div>

            <div className='h-[60vh] w-full flex justify-between items-center'>

                <div className='h-full w-full flex flex-col justify-center items-start gap-[25px]'>
                <p className='text-[6vw] font-bold bg-gradient-to-tl from-neutral-950 via-zinc-500 to-neutral-700 bg-clip-text text-transparent'>Weave thoughts <br /> into words</p>
                <p className='text-[1.8vw] font-medium bg-gradient-to-tl from-neutral-950 via-zinc-500 to-neutral-700 bg-clip-text text-transparent'>A space to write, reflect, and connect with meaning!</p>
                <button className='text-[1.4vw] font-medium bg-neutral-700 w-[13vw] p-[1vh] rounded-4xl text-zinc-100 cursor-pointer hover:bg-neutral-800'>Start reading</button>
                </div>

                <img src={homeimg} alt="home img" className='h-[60vh] object-cover' />

            </div>

            <div className='h-[10vh] w-[40%] flex flex-col justify-end items-center'>
                <hr className='w-full border-solid border-neutral-700 border-[0.5]' />
                <div className='h-[50%] w-full flex justify-center items-center gap-[2vw] text-neutral-700 font-normal'>
                    <p className='text-[0.8vw]'>Help</p>
                    <p className='text-[0.8vw]'>About</p>
                    <p className='text-[0.8vw]'>Careers</p>
                    <p className='text-[0.8vw]'>Blog</p>
                    <p className='text-[0.8vw]'>Privacy</p>
                    <p className='text-[0.8vw]'>Rules</p>
                    <p className='text-[0.8vw]'>Terms</p>

                </div>


            </div>
            
        </div>
    )
}

export default Homepage;