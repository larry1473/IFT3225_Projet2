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
        if(!allProjects) return;
        console.log("filters : ",filters);

        const { projectname, username } = filters;
        const projectnameLower = projectname.toLowerCase();
        const usernameLower = username.toLowerCase();
        
        const filteredProjects = allProjects.filter(p => 
        (projectname === '' || p.name.toLowerCase().includes(projectnameLower)) && 
        (username === '' || p.hostName.toLowerCase().includes(usernameLower))
    );

    setProjectsFiltered(filteredProjects);
    }, [allProjects, filters]);   

    // Set current tasks
    const lastProjectIndex = currentPage * projectsPerPage;
    const firstProjectIndex = lastProjectIndex - projectsPerPage;
    const currentProjects: ProjectType[] = (projectsFiltered) ? 
            projectsFiltered.slice(firstProjectIndex, lastProjectIndex) : [];
    

    // Change page
    const handleChangePage = (pageNum:number):void => {
        setCurrentPage(pageNum);
    };
    
    return (
        <div className='home_card_section flex flex-col items-center gap-y-0 w-full border-t p-4'>
            {!cardDetailMode && <><p className='pt-2'>{projectsFiltered ? projectsFiltered.length : 0} projects found</p>
                <ProjectsPost projects={currentProjects}/>
                <ProjectsPagination 
                    currentPage={currentPage}
                    tasksPerPage={projectsPerPage}
                    tasksNum={projectsFiltered.length}
                    onPageChangeClick={handleChangePage}
                />
                <ProjectAdd />
            </>}
            
            {cardDetailMode && <ProjectDetail />}
        </div>
    );
}