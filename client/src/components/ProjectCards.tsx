import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectsPagination from './ProjectsPagination';
import ProjectDetail from './ProjectDetail';
import ProjectsPost from './ProjectsPost';
import ProjectAdd from './ProjectAdd';

type ProjectCardPropValueType = {
    projectname : string;
    username : string;
    description : string;
}

type TaskType = {
    title: string;
    hostName: string;
    guestNames: string[];
    endDate: Date | undefined;
    createDate: Date | undefined;
    targetDate: Date | undefined;
}

type ProjectType = {
    name: string;
    hostName: string;
    guestNames: string[];
    description: string;
    createDate: Date | undefined;
    targetDate: Date | undefined;
    endDate: Date | undefined;
    requestJoin: string[];
    tasks: TaskType[];
}

type FilterType = {
    projectname: string;
    username: string;
}

type ProjectCardsPropsType = {
    allProjects: ProjectType[];
    filters: FilterType;
}

export default function ProjectCards({allProjects, filters}:ProjectCardsPropsType) {
    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage, setProjectsPerPage] = useState(12);
    const [cardDetailMode, setCardDetailMode] = useState(false);
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [projectsFiltered, setProjectsFiltered] = useState<ProjectType[]>([]);

    useEffect(()=>{
        const fetchProjects = async ()=>{
            try{
                const res = await axios.get(`http://localhost:3000/api/v1/projects`);
                setProjects(res.data.projects);
                console.log("Fetching projects");
                console.log(allProjects);
            } catch(err) {
                console.error("Fetching projects failed : ", err);
            }
        }
        fetchProjects();
    }, []);

    useEffect(()=>{
        console.log(filters);
        console.log(allProjects);
        console.log(filters.projectname, " & ", filters.username);
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
        
    }, [filters]);   

    // Set current tasks
    const lastProjectIndex = currentPage * projectsPerPage;
    const firstProjectIndex = lastProjectIndex - projectsPerPage;
    // const currentProjects:ProjectType[] = projects.slice(firstProjectIndex, lastProjectIndex);
    const currentProjects: ProjectType[] = (projects) ? 
    projects.slice(firstProjectIndex, lastProjectIndex) : [];
    

    // Change page
    const handleChangePage = (pageNum:number):void => {
        setCurrentPage(pageNum);
    };

    const handleAddClick = (project: ProjectType)=>{
        setProjects([...projects, project]);
    }

    const handleDeleteClick = (project: ProjectType)=>{
        setProjects(projects.filter(p => p.hostName !== project.hostName));
    }

    
    return (
        <div className='home_card_section flex flex-col items-center gap-y-2 w-full border-t p-5'>
            {!cardDetailMode && <><p className='pt-5'>{allProjects ? projects.length : 0} projects found</p>
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