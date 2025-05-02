import { Outlet, NavLink } from 'react-router-dom';
import home from '../assets/home.png';
import post from '../assets/post.png';
import comment from '../assets/comment.png';
import logout from '../assets/logout.png';
import dashboard from '../assets/dashboard.png';
import support from '../assets/support.png';

function Dashboard(){
    return(
        <div className="main-container grid grid-cols-[1fr_4fr] justify-items-center items-center">

            <div className="h-screen w-full flex flex-col justify-between items-center p-[4vh] bg-gray-700">
                
            <div className='h-[7vh] w-full flex justify-start items-center gap-[10px]'>
                    <img src={dashboard} alt="dashboard logo" className='h-[90%] object-cover' />
                    <p className='text-[2.4vw] text-gray-200 font-medium'>Dashboard</p>
                </div>

                <div className='h-[70%] w-[60%] flex flex-col justify-start items-start gap-[4vh]'>
                    <NavLink to="/dashboard" end className={({ isActive }) => `h-[3vh] w-full flex justify-start items-center gap-[10px] ${isActive ? "text-gray-400" : "text-gray-200"}` }>
                        <img src={home} alt="home-logo" className='h-[90%] object-cover'/>
                        <p className='text-[1.3vw]'>Home</p>
                    </NavLink>

                    <NavLink to="/dashboard/posts" className={({ isActive }) => `h-[3vh] w-full flex justify-start items-center gap-[10px] ${isActive ? "text-gray-400" : "text-gray-200"}` }>
                        <img src={post} alt="post-logo" className='h-[90%] object-cover' />
                        <p className='text-[1.3vw]'>Posts</p>
                    </NavLink>
                    
                    <NavLink to="/dashboard/comments" className={({ isActive }) => `h-[3vh] w-full flex justify-start items-center gap-[10px] ${isActive ? "text-gray-400" : "text-gray-200"}` }>
                        <img src={comment} alt="comment-logo" className='h-[90%] object-cover'/>
                        <p className='text-[1.3vw]'>Comments</p>
                    </NavLink>

                    <NavLink to="/dashboard/support" className={({ isActive }) => `h-[3vh] w-full flex justify-start items-center gap-[10px] ${isActive ? "text-gray-400" : "text-gray-200"}` }>
                        <img src={support} alt="support-logo" className='h-[90%] object-cover'/>
                        <p className='text-[1.3vw]'>Support</p>
                    </NavLink>
                </div>

                <div className='h-[3vh] w-[60%] flex justify-start items-center gap-[10px]'>
                    <img src={logout} alt="log-out logo" className='h-[90%] object-cover' />
                    <p className='text-[1.3vw] text-gray-200'>Sign out</p>
                </div>
                
            </div>

            <div className="min-h-screen w-full flex flex-col justify-start items-center">
               <Outlet />
            </div>
    
        </div>
    )
}

export default Dashboard;