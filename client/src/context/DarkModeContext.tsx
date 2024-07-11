import { createContext, useState, ReactNode, useEffect, useContext } from 'react';

type DarkModeProviderProps = {
    children: ReactNode;
}

type DarkModeContextType = {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export function DarkModeProvider({children} : DarkModeProviderProps){
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = ()=>{
        setDarkMode(!darkMode);
        updateDarkMode(!darkMode);
    }

    useEffect(()=>{
        const isDark = localStorage.theme === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        setDarkMode(isDark);
        updateDarkMode(isDark);
    }, []);

    return (
        <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    );
}

function updateDarkMode(darkMode:boolean){
    if(darkMode){
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
    }
}

export const useDarkMode = ():DarkModeContextType => {
    const context = useContext(DarkModeContext);

    if(!context){
        throw new Error('useDarkMode must be used within a DarkModeProvider');
    }

    return context;
}