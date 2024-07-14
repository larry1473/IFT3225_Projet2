import { createContext, useState, ReactNode, useEffect, useContext } from 'react';

type LoginStatusProps = {
    children: ReactNode;
}

type LoginStatusContextType = {
    hasLogin: boolean;
    toggleHasLogin: ()=> void;
    // userLogedIn: string;
    // handleUserLogedIn: (username : string) => void;
}

const LoginStatusContext = createContext<LoginStatusContextType | undefined>(undefined);

export function LoginStatusProvider({children} : LoginStatusProps){
    const [hasLogin, setHasLogin] = useState(true);
    const toggleHasLogin = ()=>{
        setHasLogin(true);
    }

    return (
        <LoginStatusContext.Provider value={{hasLogin, toggleHasLogin}}>
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