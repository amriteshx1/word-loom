import homeimg from '../assets/homeimg.png';

function Homepage(){
    return(
        <div className="main-container p-[10vh]">

            <div className='h-[50vh] w-full flex flex-col justify-center items-start gap-[25px]'>
                <p className='text-[6vw] font-bold bg-gradient-to-tl from-neutral-950 via-zinc-500 to-neutral-700 bg-clip-text text-transparent'>Weave thoughts <br /> into words</p>
                <p className='text-[1.8vw] font-medium bg-gradient-to-tl from-neutral-950 via-zinc-500 to-neutral-700 bg-clip-text text-transparent'>A space to write, reflect, and connect with meaning!</p>
                <button className='text-[1.4vw] font-medium bg-neutral-700 w-[13vw] p-[1vh] rounded-4xl text-zinc-100 cursor-pointer hover:bg-neutral-800'>Start reading</button>
            </div>

            <img src={homeimg} alt="home img" className='h-[60vh] object-cover' />
        </div>
    )
}

export default Homepage;