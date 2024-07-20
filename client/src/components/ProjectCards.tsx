import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectsPagination from './ProjectsPagination';
import ProjectDetail from './ProjectDetail';
import ProjectsPost from './ProjectsPost';
import ProjectAdd from './ProjectAdd';
import { ProjectAddType, ProjectType } from '../types/TaskMasterTypes';
import { useProjects } from '../context/ProjectsContext';


type FilterType = {
    projectname: string;
    username: string;
}

type ProjectCardsPropsType = {
    filters: FilterType;
}

export default function ProjectCards({filters}:ProjectCardsPropsType) {
    const {allProjects, setAllProjects} = useProjects();
    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage, setProjectsPerPage] = useState(9);
    const [cardDetailMode, setCardDetailMode] = useState(false);
    const [projectsFiltered, setProjectsFiltered] = useState<ProjectType[]>([]);

    useEffect(()=>{
        // console.log(filters);
        console.log(allProjects);
        if(!allProjects) return;
        console.log("pass");
        
        if(filters.projectname === '' && filters.username === ''){
            console.log("1");
            setProjectsFiltered(allProjects);
        } else if(filters.projectname === ''){
            console.log("2");
            setProjectsFiltered(allProjects.filter(p => p.hostName === filters.username));
        } else if(filters.username === ''){
            console.log("3");
            setProjectsFiltered(allProjects.filter(p => p.name.indexOf(filters.projectname) !== -1));
        } else {
            console.log("4");
            setProjectsFiltered(allProjects.filter(p => p.hostName === filters.username || p.name.includes(filters.projectname)));
        }
        
        console.log("filtered : ", projectsFiltered);
        
    }, [allProjects, filters]);   

    // Set current tasks
    const lastProjectIndex = currentPage * projectsPerPage;
    const firstProjectIndex = lastProjectIndex - projectsPerPage;
    const currentProjects: ProjectType[] = (projectsFiltered) ? 
            projectsFiltered.slice(firstProjectIndex, lastProjectIndex) : [];
    console.log(currentProjects);
    

    // Change page
    const handleChangePage = (pageNum:number):void => {
        setCurrentPage(pageNum);
    };

    // Add project
    const handleAddClick = ()=>{
        // setProjects([...projects, project]);
    }

    // Delete project
    const handleDeleteClick = (project: ProjectType)=>{
        // setProjects(projects.filter(p => p.hostName !== project.hostName));
        postDeleteProject(project);
    }
    const postDeleteProject = async (project: ProjectType)=>{
        const token = localStorage.getItem('token');
        const projectJson = JSON.stringify(project);

        try{
            const res = await axios.post(`http://localhost:3000/api/v1/projects/${project._id}`, projectJson, {
                headers:{
                    'Authorization': `Bearer ${token}`,
                }
            });
            console.log("add project response message : ", res.data.message);
        } catch(err){
            console.error(err);
        }
    }

    
    return (
        <div className='home_card_section flex flex-col items-center gap-y-2 w-full border-t p-4'>
            {!cardDetailMode && <><p className='pt-2'>{projectsFiltered ? projectsFiltered.length : 0} projects found</p>
                <ProjectsPost projects={currentProjects} onDeleteClick={handleDeleteClick}/>
                <ProjectsPagination 
                    currentPage={currentPage}
                    tasksPerPage={projectsPerPage}
                    tasksNum={currentProjects.length}
                    onPageChangeClick={handleChangePage}
                />
                <ProjectAdd onAddClick={handleAddClick}/>
            </>}
            
            {cardDetailMode && <ProjectDetail />}
        </div>
    );
}