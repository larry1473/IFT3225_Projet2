import React, { useState } from 'react';
import TaskCard from './TaskCard';
import { useProjects } from '../context/ProjectsContext';
import { TaskType } from '../types/TaskMasterTypes';


type TaskGroupProps = {
    title:string;
    tasklist: TaskType[];
};

export default function TaskGroup({title, tasklist}:TaskGroupProps) {
    const {projectSelected, setProjectSelected} = useProjects();
    console.log(tasklist);
    
    return (
        <div className='taskgroup col-span-1 flex flex-col items-center gap-y-4 px-5 py-5 border w-full h-lvh'>
            <h3 className='font-bold'>{title}</h3>
            <ul className='w-full'>
                {/* <TaskCard 
                    title={title}
                    task={{}}
                /> */}
                {tasklist.map(t => (
                    <TaskCard title={title} task={t} />
                ))}
            </ul>
        </div>
    );
}

