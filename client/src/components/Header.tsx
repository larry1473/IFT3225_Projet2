import React from 'react';
import { Link } from 'react-router-dom';
import { SiNginxproxymanager } from "react-icons/si";
import { HiSun, HiMoon } from "react-icons/hi";

export default function Header() {
    return (
        <header className='flex h-14 justify-center gap-x-10'>
            <Link to='/' className='flex justify-center items-center gap-x-1'>
                <SiNginxproxymanager className='logo size-8'/>
                <p className='logo_title text-2xl'>TaskMaster</p>
            </Link>
            <nav className='flex items-center justify-center'>                    
                <li className='flex items-center justify-center gap-x-2'>
                    <HiSun />
                    <button>Login</button>
                </li>
            </nav>
        </header>
    );
}