import { createContext, useState, ReactNode, useEffect, useContext } from 'react';

type CardDetailModeProviderPropsType = {
    children: ReactNode;
}

type CardDetailModeContextType = {
    detailMode: boolean;
    toggleDetailMode: ()=>void;
}

const CardDetailModeContext = createContext<CardDetailModeContextType | undefined>(undefined);

export function CardDetailModeProvider({children}:CardDetailModeProviderPropsType){
    const [detailMode, setDetailMode] = useState(false);
    const toggleDetailMode = ()=>{
        setDetailMode(true);
    }

    return (
        <CardDetailModeContext.Provider value={{detailMode, toggleDetailMode}}>
            {children}
        </CardDetailModeContext.Provider>
    )
}

export const useCardDetailMode = ():CardDetailModeContextType =>{
    const context = useContext(CardDetailModeContext);

    if(!context){
        throw new Error('useCardDetailMode must be used within a DarkModeProvider');
    }

    return context;
}