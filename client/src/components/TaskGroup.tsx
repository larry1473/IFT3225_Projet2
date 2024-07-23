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
    
    return (
        <div className='flex flex-col items-center gap-y-4 px-5 py-5 border w-full h-lvh xl:w-1/2'>
            <h3 className='font-bold'>{title}</h3>
            <h3 className='font-sm'>{tasklist.length} tasks</h3>
            <ul className='taskgroup flex flex-col gap-y-2 w-full'>
                {tasklist.map(t => (
                    <TaskCard title={title} task={t} />
                ))}
            </ul>
        </div>
    );
}

