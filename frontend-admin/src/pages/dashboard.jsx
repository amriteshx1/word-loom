import { Outlet, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import home from '../assets/home.png';
import post from '../assets/post.png';
import comment from '../assets/comment.png';
import logout from '../assets/logout.png';
import dashboard from '../assets/dashboard.png';
import support from '../assets/support.png';

function Dashboard(){
    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          navigate("/");
        }
    };

    return(
        <div className="main-container grid grid-cols-[1fr_4fr] justify-items-center items-center">

            <div className="h-screen w-full flex flex-col justify-between items-center p-[4vh] bg-neutral-900">
                
            <div className='h-[7vh] w-full flex justify-start items-center gap-[10px]'>
                    <img src={dashboard} alt="dashboard logo" className='h-[90%] object-cover' />
                    <p className='text-[2.4vw] text-gray-200 font-medium'>Dashboard</p>
                </div>

                <div className='h-[70%] w-[60%] flex flex-col justify-start items-start gap-[4vh]'>
                    <NavLink to="/dashboard" end className={({ isActive }) => `h-[3vh] w-full flex justify-start items-center gap-[10px] ${isActive ? "text-neutral-400" : "text-white"}` }>
                        <img src={home} alt="home-logo" className='h-[90%] object-cover'/>
                        <p className='text-[1.3vw]'>Home</p>
                    </NavLink>

                    <NavLink to="/dashboard/posts" className={({ isActive }) => `h-[3vh] w-full flex justify-start items-center gap-[10px] ${isActive ? "text-neutral-400" : "text-white"}` }>
                        <img src={post} alt="post-logo" className='h-[90%] object-cover' />
                        <p className='text-[1.3vw]'>Blogs</p>
                    </NavLink>
                    
                    <NavLink to="/dashboard/comments" className={({ isActive }) => `h-[3vh] w-full flex justify-start items-center gap-[10px] ${isActive ? "text-neutral-400" : "text-white"}` }>
                        <img src={comment} alt="comment-logo" className='h-[90%] object-cover'/>
                        <p className='text-[1.3vw]'>Comments</p>
                    </NavLink>

                    <NavLink to="/dashboard/support" className={({ isActive }) => `h-[3vh] w-full flex justify-start items-center gap-[10px] ${isActive ? "text-neutral-400" : "text-white"}` }>
                        <img src={support} alt="support-logo" className='h-[90%] object-cover'/>
                        <p className='text-[1.3vw]'>Support</p>
                    </NavLink>
                </div>

                <div onClick={handleLogout} className='h-[3vh] w-[60%] flex justify-start items-center gap-[10px] cursor-pointer text-white hover:text-neutral-400'>
                    <img src={logout} alt="log-out logo" className='h-[90%] object-cover' />
                    <p className='text-[1.3vw]'>Sign out</p>
                </div>
                
            </div>

            <div className="h-screen w-full overflow-y-auto flex flex-col justify-start items-center">
               <Outlet />
            </div>
    
        </div>
    )
};

export default Dashboard;