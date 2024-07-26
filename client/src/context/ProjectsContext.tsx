import { createContext, useState, ReactNode, useEffect, useContext, Dispatch, SetStateAction } from 'react';
import { ProjectType } from '../types/TaskMasterTypes';
import axios from 'axios';

type ProjectContextType = {
    allProjects: ProjectType[];
    setAllProjects: Dispatch<SetStateAction<ProjectType[]>>;
    handleDeleteProjectClick: (project: ProjectType) => void;
    fetchProjects(): Promise<void>;
    projectSelected: ProjectType | undefined;
    setProjectSelected: Dispatch<SetStateAction<ProjectType | undefined>>;
}

type ProjectProviderPropsType = {
    children : ReactNode;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({children} : ProjectProviderPropsType){
    const [allProjects, setAllProjects] = useState<ProjectType[]>([]);
    const [projectSelected, setProjectSelected] = useState<ProjectType>();
    
    const handleDeleteProjectClick = (project: ProjectType)=>{
        const projects = allProjects ? allProjects.filter(p => p._id !== project._id):[];
        setAllProjects(projects);
    }

    useEffect(()=>{
        // console.log("Fetching all projects...");
        fetchProjects();
    }, []);
    // useEffect(()=>{
    //     const projectUpdated = allProjects.filter(p=>p._id === projectSelected?._id);


    // }, [allProjects]);
    const fetchProjects = async ()=>{
        try{
            const res = await axios.get(`http://localhost:3000/api/v1/projects`);
            setAllProjects(res.data.projects);
            // console.log("Fetching projects");
        } catch(err) {
            console.error("Fetching projects failed : ", err);
        }
    }

    return (
        <ProjectContext.Provider value={{allProjects, setAllProjects, handleDeleteProjectClick, fetchProjects, projectSelected, setProjectSelected}}>
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