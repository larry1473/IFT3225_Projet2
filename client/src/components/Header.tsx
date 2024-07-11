import { Link } from 'react-router-dom';
import { SiNginxproxymanager } from "react-icons/si";
import { HiSun, HiMoon } from "react-icons/hi";
import { useDarkMode } from '../context/DarkModeContext';

export default function Header() {
    const {darkMode, toggleDarkMode} = useDarkMode();
    return (
        <header className='header flex h-14 justify-between px-14'>
            <Link to='/' className='flex justify-center items-center gap-x-1'>
                <SiNginxproxymanager className='logo size-8'/>
                <p className='logo_title text-2xl'>TaskMaster</p>
            </Link>
            <nav className='flex items-center justify-center'>                    
                <li className='flex items-center justify-center gap-x-2'>
                    <button onClick={toggleDarkMode} className=''>
                        {darkMode && <HiSun />}
                        {!darkMode && <HiMoon />}
                    </button>
                    <Link to="Connection">Login</Link>
                </li>
            </nav>
        </header>
    );
}