import { Link, useNavigate } from 'react-router-dom';
import { SiNginxproxymanager } from "react-icons/si";
import { HiSun, HiMoon } from "react-icons/hi";
import { useDarkMode } from '../context/DarkModeContext';
import { useLoginStatus } from '../context/LoginStatusContext';
import axios from 'axios';


export default function Header() {
    const navigate = useNavigate();
    const {darkMode, toggleDarkMode} = useDarkMode();
    const {hasLogedin, setHasLogedin, userLogedIn, setUserLogedIn, setUsername} = useLoginStatus();
    const handleLogoutClick = (e:React.MouseEvent<HTMLButtonElement>)=>{
        console.log(e.target);
        // sessionStorage.removeItem('isLogedIn');
        // sessionStorage.removeItem('userMail');
        // sessionStorage.removeItem('username');
        setHasLogedin(false);
        setUserLogedIn("");
        setUsername("");
        fetchLogout();
    }
    const fetchLogout = async ()=>{
        try {
            const response = await axios.get('http://localhost:3000/api/v1/logout');
            console.log('Data from server:', response.data);
            console.log("Log out success");
            navigate('../connection/login');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    
    return (
        <header className='header flex h-16 justify-between px-14'>
            <Link to='/' className='flex justify-center items-center gap-x-1'>
                <SiNginxproxymanager className='logo size-8'/>
                <p className='logo_title text-2xl'>TaskMaster</p>
            </Link>
            <nav className='flex items-center justify-center'>                    
                <li className='flex items-center justify-center gap-x-4'>
                    <button onClick={toggleDarkMode} className=''>
                        {darkMode && <HiSun className='size-6'/>}
                        {!darkMode && <HiMoon className='size-6'/>}
                    </button>
                    {!hasLogedin && <Link to="connection/login" className='size-6'>Login</Link>}
                    {hasLogedin && <button onClick={handleLogoutClick} className='size-6'>Logout</button>}
                </li>
            </nav>
        </header>
    );
}