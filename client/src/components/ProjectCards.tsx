import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import ProjectCard from './ProjectCard';
import TasksPost from './TasksPost';
import TaskPagination from './TaskPagination';
import TaskDetail from './TaskDetail';

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

export default function ProjectCards() {
    const [tasks, setTasks] = useState<ProjectCardPropValueType[]>(testData);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage, setTasksPerPage] = useState(12);
    const [cardDetailMode, setCardDetailMode] = useState(false);

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
        <div className='flex flex-col items-center w-full border-t p-5'>
            {!cardDetailMode && <><p className='pt-5'>{tasks.length} tasks found</p>
            <TasksPost tasks={currentTask}/>
            <TaskPagination 
                currentPage={currentPage}
                tasksPerPage={tasksPerPage}
                tasksNum={tasks.length}
                onPageChangeClick={handleChangePage}
            /></>}
            {cardDetailMode && <TaskDetail />}
        </div>
    );
}