import { useQuery } from '@tanstack/react-query';
import { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect, useContext } from 'react';
import axios from 'axios';

type TaskType = {
    title: string;
    description: string;
    hostId: string;
    guestId: string[];
    endDate: Date;
    createDate: Date;
    targetDate: Date;
}

type ProjectsType = {
    name: string;
    hostId: string;
    gestId: string[];
    description: string;
    createDate: Date;
    targetDate: Date;
    endDate: Date;
    requestJoin: string[];
    tasks: TaskType[];
}

type ProjectsContextType = {
    projects: ProjectsType[];
    setProjects: Dispatch<SetStateAction<ProjectsType[]>>;
}

type ProjectsPropsType = {
    children: ReactNode;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export function ProjectsProvider({children}: ProjectsPropsType){
    const [projects, setProjects] = useState<ProjectsType[]>([]);

    return(
        <ProjectsContext.Provider value={{projects, setProjects}} >
            {children}
        </ProjectsContext.Provider>
    );
}

export const useProjects = ():ProjectsContextType =>{
    const context = useContext(ProjectsContext);

    if(!context){
        throw new Error('useProjects must be used within a ProjectsProvider');
    }

    return context;
}