import { useNavigate } from 'react-router-dom';

export default function Feed(){
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
        <div>
        <h1>Hiii u are at feed!</h1>
        <div onClick={handleLogout}>
            <p>Sign Out</p>
        </div>
        </div>
    )
}