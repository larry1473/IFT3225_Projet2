import { createContext, useState, ReactNode, useEffect, useContext, Dispatch, SetStateAction } from 'react';
import { ProjectType } from '../types/TaskMasterTypes';

type ProjectContextType = {
    allProjects: ProjectType[];
    setAllProjects: Dispatch<SetStateAction<ProjectType[]>>;
    handleAddProjectClick: (project: ProjectType) => void;
    handleDeleteProjectClick: (project: ProjectType) => void;
}

type ProjectProviderPropsType = {
    children : ReactNode;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({children} : ProjectProviderPropsType){
    const [allProjects, setAllProjects] = useState<ProjectType[]>([]);
    const handleAddProjectClick = (project: ProjectType)=>{
        setAllProjects(prev => [...prev, project]);
    }
    const handleDeleteProjectClick = (project: ProjectType)=>{
        const projects = allProjects.filter(p => p._id !== project._id);
        setAllProjects(projects);
    }

    return (
        <ProjectContext.Provider value={{allProjects, setAllProjects, handleAddProjectClick, handleDeleteProjectClick}}>
            {children}
        </ProjectContext.Provider>
    )
}

export const useProjects = ():ProjectContextType =>{
    const context = useContext(ProjectContext);

    if(!context){
        throw new Error('useProjects must be used within a ProjectProvider');
    }

    return context;
}