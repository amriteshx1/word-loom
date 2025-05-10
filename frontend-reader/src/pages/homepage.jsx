import homeimg from '../assets/homeimg.png';

function Homepage(){
    return(
        <div className="main-container p-[10vh]">

            <div className='h-[50vh] w-full flex flex-col justify-center items-start gap-[25px]'>
                <p className='text-[6vw] font-bold bg-gradient-to-tl from-neutral-800 via-zinc-400 to-neutral-600 bg-clip-text text-transparent'>Weave thoughts <br /> into words</p>
                <p className='text-[1.8vw] font-medium bg-gradient-to-tl from-neutral-800 via-zinc-400 to-neutral-600 bg-clip-text text-transparent'>A space to write, reflect, and connect with meaning!</p>
                <button className='text-[1.4vw] font-medium bg-teal-950 w-[13vw] p-[1vh] rounded-4xl text-zinc-200 cursor-pointer'>Start reading</button>
            </div>

            <img src={homeimg} alt="home img" className='h-[60vh] object-cover' />
        </div>
    )
}

export default Homepage;