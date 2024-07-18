import { createContext, useState, ReactNode, useEffect, useContext } from 'react';

type LoginStatusProps = {
    children: ReactNode;
}

type LoginStatusContextType = {
    hasLogedin: boolean;
    setHasLogedin: (bool : boolean)=> void;
    userLogedIn: string;
    setUserLogedIn: (username : string) => void;
}

const LoginStatusContext = createContext<LoginStatusContextType | undefined>(undefined);

export function LoginStatusProvider({children} : LoginStatusProps){
    const [hasLogedin, setHasLogedin] = useState(false);
    const [userLogedIn, setUserLogedIn] = useState("me");

    return (
        <LoginStatusContext.Provider value={{hasLogedin, setHasLogedin, userLogedIn, setUserLogedIn}}>
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