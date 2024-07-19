import React, { useEffect, useState } from 'react';
import TasksPost from './TasksPost';
import TaskDetail from './ProjectDetail';
import { useProjects } from '../context/ProjectsContext';
import axios from 'axios';
import ProjectsPagination from './ProjectsPagination';
import ProjectDetail from './ProjectDetail';

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

export default function ProjectCards() {
    const [tasks, setTasks] = useState<ProjectCardPropValueType[]>(testData);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage, setTasksPerPage] = useState(12);
    const [cardDetailMode, setCardDetailMode] = useState(false);
    const [projects, setProjects] = useState<ProjectsType[]>([]);

    useEffect(()=>{
        const fetchProjects = async ()=>{
            const token = localStorage.getItem('token');

            try{
                const res = await axios.get(`http://localhost:3000/api/v1/projects`, {
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProjects(res.data);
            } catch(err) {
                console.log(err);
            }
        }

        fetchProjects();
    }, []);

    console.log(projects);
    

    // Set current tasks
    const lastTaskIndex = currentPage * tasksPerPage;
    const firstTaskIndex = lastTaskIndex - tasksPerPage;
    const currentTask:ProjectCardPropValueType[] = tasks.slice(firstTaskIndex, lastTaskIndex);

    // Change page
    const handleChangePage = (pageNum:number):void => {
        setCurrentPage(pageNum);
    };

    const handleCardClick = ()=>{
        
    }

    return (
        <div className='flex flex-col items-center w-full h-lvh border-t p-5'>
            {!cardDetailMode && <><p className='pt-5'>{tasks.length} projects found</p>
            <TasksPost tasks={currentTask}/>
            <ProjectsPagination 
                currentPage={currentPage}
                tasksPerPage={tasksPerPage}
                tasksNum={tasks.length}
                onPageChangeClick={handleChangePage}
            /></>}
            {cardDetailMode && <ProjectDetail />}
        </div>
    );
}