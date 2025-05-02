import loginpageimg from '../assets/loginpage.jpg'

function Login(){
    return(
        <div className="main-container">
            <div className='h-screen w-[50%] flex flex-col justify-around items-center p-[2vh] gap-[3vh]'>

                <div className='h-[45%] w-full flex flex-col justify-end items-center gap-[0.7vh]'>
                    <p className='text-[5.3vw] text-gray-700'>Wordloom</p>
                    <p className='text-[2.3vw] text-gray-600'>Admin Privilages</p>
                    <p className='text-[1vw] text-gray-500'>© All rights reserved</p>
                </div>
                <div className='h-[45%] w-full flex justify-center items-start gap-[2vh]'>
                    <img src={loginpageimg} alt="dummy-admin-image" className='h-[97%] w-[45%] object-cover'/>
                </div>
                
            </div>

            <div className='h-screen w-[50%] flex justify-center items-center p-[2vh] bg-gray-700'>
                
                <form className='h-[80%] w-[60%] flex flex-col justify-center items-center gap-[1.5vh]' action="/login" method="post">
                    
                    <p className='text-[2vw] text-gray-200'>Sign In!</p>
                    <div className='w-full flex flex-col justify-center items-start gap-1.5'>
                        <label for="email" className='text-[1.2vw] text-gray-200'>Email:</label>
                        <input type="email" name="email" id="email" required className='w-full p-1.5 border-2 border-gray-200 rounded-xl bg-white text-[1.2vw]'/>
                    </div>
                    
                    <div className='w-full flex flex-col justify-center items-start gap-1.5'>
                        <label for="password" className='text-[1.2vw] text-gray-200'>Password:</label>
                        <input type="password" name="password" id="password" required className='w-full p-1.5 border-2 border-gray-200 rounded-xl bg-white text-[1.2vw]'/>
                    </div>
            
                    <button type="submit" className=" bg-white text-gray-700 border-2 border-white rounded-xl hover:bg-gray-200 w-[30%] text-[1.2vw] p-1 mt-[2vh] cursor-pointer">Login</button>
                </form>

            </div>
        </div>
    )
}

export default Login;