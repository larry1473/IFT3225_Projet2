import React, { useState } from 'react';
import TaskCard from './TaskCard';
import { useProjects } from '../context/ProjectsContext';


type TaskGroupProps = {
    title:string;
};

export default function TaskGroup({title}:TaskGroupProps) {
    const {projectSelected, setProjectSelected} = useProjects();

    return (
        <div className='taskgroup col-span-1 flex flex-col items-center gap-y-4 px-5 py-5 border w-full h-lvh'>
            <h3 className='font-bold'>{title}</h3>
            <ul className='w-full'>
                <TaskCard 
                    isDoing={title === "Doing"? true : false} 
                    isDone={title === "Done"? true : false}
                />
            </ul>
        </div>
    );
}

