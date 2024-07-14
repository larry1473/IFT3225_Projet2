import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import TaskCard from './TaskCard';
import TasksPost from './TasksPost';
import TaskPagination from './TaskPagination';

type TaskCardPropValueType = {
    projectname : string;
    username : string;
    date : string;
}

const testData: TaskCardPropValueType[] = [
    {
        projectname : "project1",
        username : "user1",
        date : "date1",
    },
    {
        projectname : "project2",
        username : "user2",
        date : "date2",
    },
    {
        projectname : "project3",
        username : "user3",
        date : "date3",
    },
    {
        projectname : "project4",
        username : "user4",
        date : "date4",
    },
    {
        projectname : "project5",
        username : "user5",
        date : "date5",
    },
    {
        projectname : "project6",
        username : "user6",
        date : "date6",
    },
    {
        projectname : "project7",
        username : "user7",
        date : "date7",
    },
    {
        projectname : "project8",
        username : "user8",
        date : "date8",
    },
    {
        projectname : "project9",
        username : "user9",
        date : "date9",
    },
    {
        projectname : "project10",
        username : "user10",
        date : "date10",
    },
    {
        projectname : "project6",
        username : "user6",
        date : "date6",
    },
    {
        projectname : "project7",
        username : "user7",
        date : "date7",
    },
    {
        projectname : "project8",
        username : "user8",
        date : "date8",
    },
    {
        projectname : "project9",
        username : "user9",
        date : "date9",
    },
    {
        projectname : "project10",
        username : "user10",
        date : "date10",
    },
]

export default function TaskCards() {
    const [tasks, setTasks] = useState<TaskCardPropValueType[]>(testData);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage, setTasksPerPage] = useState(12);

    // Set current tasks
    const lastTaskIndex = currentPage * tasksPerPage;
    const firstTaskIndex = lastTaskIndex - tasksPerPage;
    const currentTask:TaskCardPropValueType[] = tasks.slice(firstTaskIndex, lastTaskIndex);

    // Change page
    const handleChangePage = (pageNum:number):void => {
        console.log(pageNum);
        setCurrentPage(pageNum);
    };

    return (
        <div className='flex flex-col items-center w-full border-t'>
            <p className='pt-5'>{tasks.length} tasks found</p>
            {/* <div className='taskcards grid grid-cols-3 place-items-center gap-x-0 gap-y-2 px-5 py-5 w-full'>
                {tasks.map((task)=>(
                    <TaskCard key={uuidv4()} task={task}/>
                ))}
            </div> */}
            <TasksPost tasks={currentTask}/>
            <TaskPagination 
                tasksPerPage={tasksPerPage}
                tasksNum={tasks.length}
                onPageChangeClick={handleChangePage}
            />
        </div>
    );
}