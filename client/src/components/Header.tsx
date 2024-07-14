import { Link } from 'react-router-dom';
import Filter from './Filter';
import { SiNginxproxymanager } from "react-icons/si";
import { HiSun, HiMoon } from "react-icons/hi";
import { useDarkMode } from '../context/DarkModeContext';
import { useLoginStatus } from '../context/LoginStatusProvider';

export default function Header() {
    const {darkMode, toggleDarkMode} = useDarkMode();
    const {hasLogin, toggleHasLogin} = useLoginStatus();
    
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
                    {!hasLogin && <Link to="Connection" className='size-6'>Login</Link>}
                    {hasLogin && <Link to="Connection" className='size-6'>Logout</Link>}
                </li>
            </nav>
        </header>
    );
}