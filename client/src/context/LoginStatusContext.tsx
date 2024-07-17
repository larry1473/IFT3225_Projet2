import { createContext, useState, ReactNode, useEffect, useContext } from 'react';

type LoginStatusProps = {
    children: ReactNode;
}

type LoginStatusContextType = {
    hasLogedin: boolean;
    toggleHasLogin: ()=> void;
    // userLogedIn: string;
    // handleUserLogedIn: (username : string) => void;
}

const LoginStatusContext = createContext<LoginStatusContextType | undefined>(undefined);

export function LoginStatusProvider({children} : LoginStatusProps){
    const [hasLogedin, setHasLogedin] = useState(false);
    const toggleHasLogin = ()=>{
        setHasLogedin(true);
    }

    return (
        <LoginStatusContext.Provider value={{hasLogedin, toggleHasLogin}}>
            {children}
        </LoginStatusContext.Provider>
    );
}

export const useLoginStatus = ():LoginStatusContextType =>{
    const context = useContext(LoginStatusContext);

    if(!context){
        throw new Error('useLoginStatus must be used within a LoginStatusProvider');
    }

    return context;
}