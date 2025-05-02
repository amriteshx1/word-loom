import searchimg from '../assets/search.png';
import notificationimg from '../assets/notification.png';
import profileimg from "../assets/profile.png";
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
                
            <div className='h-[7vh] w-full flex justify-start items-center gap-[13px]'>
                    <img src={dashboard} alt="dashboard logo" className='h-[90%] object-cover' />
                    <p className='text-[2.4vw] text-gray-200 font-medium'>Dashboard</p>
                </div>

                <div className='h-[70%] w-[60%] flex flex-col justify-start items-start gap-[4vh]'>
                    <div className='h-[3vh] w-full flex justify-start items-center gap-[10px]'>
                        <img src={home} alt="home-logo" className='h-[90%] object-cover'/>
                        <p className='text-[1.3vw] text-gray-200'>Home</p>
                    </div>
                    
                    <div className='h-[3vh] w-full flex justify-start items-center gap-[10px]'>
                        <img src={post} alt="post-logo" className='h-[90%] object-cover' />
                        <p className='text-[1.3vw] text-gray-200'>Posts</p>
                    </div>
                    
                    <div className='h-[3vh] w-full flex justify-start items-center gap-[10px]'>
                        <img src={comment} alt="comment-logo" className='h-[90%] object-cover'/>
                        <p className='text-[1.3vw] text-gray-200'>Comments</p>
                    </div>

                    <div className='h-[3vh] w-full flex justify-start items-center gap-[10px]'>
                        <img src={support} alt="support-logo" className='h-[90%] object-cover'/>
                        <p className='text-[1.3vw] text-gray-200'>Support</p>
                    </div>
                </div>

                <div className='h-[3vh] w-[60%] flex justify-start items-center gap-[10px]'>
                    <img src={logout} alt="log-out logo" className='h-[90%] object-cover' />
                    <p className='text-[1.3vw] text-gray-200'>Sign out</p>
                </div>
                
            </div>

            <div className="min-h-screen w-full flex flex-col justify-start items-center gap-[2vh]">
                <div>
                    <div>
                        <img src={searchimg} alt="search-logo" />
                        <input type="text"  />
                    </div>
                    <div>
                        <img src={notificationimg} alt="notification-logo" />
                        <img src={profileimg} alt="profile-logo" />
                    </div>
                </div>

                <div>
                    <div>
                        <p>What's up,</p>
                        <p>Anonymous!</p>
                    </div>

                    <div>
                        <button>New Blog +</button>
                    </div>
                
                </div>


            </div>
    
        </div>
    )
}

export default Dashboard;