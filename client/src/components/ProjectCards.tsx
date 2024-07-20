import React, { useEffect, useState } from 'react';
import { useProjects } from '../context/ProjectsContext';
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

// test data
const testData: ProjectCardPropValueType[] = [
    {
        projectname : "project1",
        username : "user1",
        description : "desription1",
    },
    {
        projectname : "project2",
        username : "user2",
        description : "desription2",
    },
    {
        projectname : "project3",
        username : "user3",
        description : "desription3",
    },
    {
        projectname : "project4",
        username : "user4",
        description : "desription4",
    },
    {
        projectname : "project5",
        username : "user5",
        description : "desription5",
    },
    {
        projectname : "project6",
        username : "user6",
        description : "desription6",
    },
    {
        projectname : "project7",
        username : "user7",
        description : "desription7",
    },
    {
        projectname : "project8",
        username : "user8",
        description : "desription8",
    },
    {
        projectname : "project9",
        username : "user9",
        description : "desription9",
    },
    {
        projectname : "project10",
        username : "user10",
        description : "desription10",
    },
    {
        projectname : "project6",
        username : "user6",
        description : "desription6",
    },
    {
        projectname : "project7",
        username : "user7",
        description : "desription7",
    },
    {
        projectname : "project8",
        username : "user8",
        description : "desription8",
    },
    {
        projectname : "project9",
        username : "user9",
        description : "desription9",
    },
    {
        projectname : "project10",
        username : "user10",
        description : "desription10",
    },
]

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
    filters: FilterType
}

export default function ProjectCards({filters}:ProjectCardsPropsType) {
    const [tasks, setTasks] = useState<ProjectCardPropValueType[]>(testData);
    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage, setProjectsPerPage] = useState(12);
    const [cardDetailMode, setCardDetailMode] = useState(false);
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [projectsFiltered, setProjectsFiltered] = useState<ProjectType[]>([]);
    // const {projects, setProjects} = useProjects();


    useEffect(()=>{
        const fetchProjects = async ()=>{
            try{
                const res = await axios.get(`http://localhost:3000/api/v1/projects`);
                setProjects(res.data.projects);
            } catch(err) {
                console.error("Fetching projects failed : ", err);
            }
        }
        fetchProjects();
    }, []);

    

    // Set current tasks
    const lastProjectIndex = currentPage * projectsPerPage;
    const firstProjectIndex = lastProjectIndex - projectsPerPage;
    // const currentProjects:ProjectType[] = projects.slice(firstProjectIndex, lastProjectIndex);
    const currentProjects: ProjectType[] = (projects && projects.length > 0) ? 
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
            {!cardDetailMode && <><p className='pt-5'>{tasks.length} projects found</p>
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