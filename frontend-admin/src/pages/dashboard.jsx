import { Outlet, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import home from '../assets/home.png';
import post from '../assets/post.png';
import comment from '../assets/comment.png';
import logout from '../assets/logout.png';
import dashboard from '../assets/dashboard.png';
import support from '../assets/support.png';
import menu from '../assets/menu.png';

function Dashboard(){
    const [isMenuOpen, setMenuOpen] = useState(false);
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
        <div className="main-container grid lg:grid-cols-[1fr_4fr] lg:grid-rows-none grid-rows-[7vh_1fr]">

            <div className="hidden lg:flex h-screen w-full flex-col justify-between items-center p-[4vh] bg-neutral-900">
                
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

            <div className='lg:hidden h-full w-full flex justify-start items-center bg-neutral-800 gap-[2vh] p-[1vh]'>
                <img src={menu} alt="menu-logo" className='h-[2.5vh] object-cover cursor-pointer' onClick={() => setMenuOpen(true)} />
                <p className='text-[2.2vh] text-white font-medium'>Wordloom - Admin</p>
            </div>

            {isMenuOpen && (
              <>
                <div
                  className="fixed inset-0 bg-black/30 backdrop-blur-[5px] z-40"
                  onClick={() => setMenuOpen(false)}
                />
            
                <div className="fixed top-0 left-0 h-full w-[70vw] max-w-[300px] bg-neutral-900 z-50 p-6 flex flex-col justify-between">
                  
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <img src={dashboard} alt="dashboard" className="h-[4vh]" />
                      <p className="text-white text-[2.3vh] font-semibold">Dashboard</p>
                    </div>
                    <button onClick={() => setMenuOpen(false)} className="text-white text-[2vh]">✖</button>
                  </div>
            
                  <div className=" h-[70%] flex flex-col justify-start gap-[4vh]">
                    <NavLink to="/dashboard" end onClick={() => setMenuOpen(false)} className={({ isActive }) => `h-[2.5vh] w-full flex justify-start items-center gap-[10px] ${isActive ? "text-neutral-400" : "text-white"}` }>
                        <img src={home} alt="home-logo" className='h-[80%] object-cover'/>
                        <p className='text-[1.8vh]'>Home</p>
                    </NavLink>

                    <NavLink to="/dashboard/posts" onClick={() => setMenuOpen(false)} className={({ isActive }) => `h-[2.5vh] w-full flex justify-start items-center gap-[10px] ${isActive ? "text-neutral-400" : "text-white"}` }>
                        <img src={post} alt="post-logo" className='h-[80%] object-cover' />
                        <p className='text-[1.8vh]'>Blogs</p>
                    </NavLink>
                    
                    <NavLink to="/dashboard/comments" onClick={() => setMenuOpen(false)} className={({ isActive }) => `h-[2.5vh] w-full flex justify-start items-center gap-[10px] ${isActive ? "text-neutral-400" : "text-white"}` }>
                        <img src={comment} alt="comment-logo" className='h-[80%] object-cover'/>
                        <p className='text-[1.8vh]'>Comments</p>
                    </NavLink>

                    <NavLink to="/dashboard/support" onClick={() => setMenuOpen(false)} className={({ isActive }) => `h-[2.5vh] w-full flex justify-start items-center gap-[10px] ${isActive ? "text-neutral-400" : "text-white"}` }>
                        <img src={support} alt="support-logo" className='h-[80%] object-cover'/>
                        <p className='text-[1.8vh]'>Support</p>
                    </NavLink>
                  </div>

                  <div onClick={handleLogout} className='h-[3vh] w-full flex justify-start items-center gap-[10px] cursor-pointer text-white hover:text-neutral-400'>
                    <img src={logout} alt="log-out logo" className='h-[80%] object-cover' />
                    <p className='text-[1.8vh]'>Sign out</p>
                  </div>
                </div>
              </>
            )}


            <div className="lg:h-screen h-full w-full overflow-y-auto flex flex-col justify-start items-center bg-neutral-800">
               <Outlet />
            </div>
    
        </div>
    )
};

export default Dashboard;