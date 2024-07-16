import React from 'react';
import {v4 as uuidv4} from 'uuid';
import TaskCard from './ProjectCard';

type TaskCardPropValueType = {
    projectname : string;
    username : string;
    description: string;
}

type TasksPostPropsType = {
    tasks:TaskCardPropValueType[];
}

export default function TasksPost({tasks}:TasksPostPropsType) {
    const handleCardClick = (e: React.MouseEvent)=>{
        console.log(e);
    }
    return (
        <ul className='taskcards grid grid-cols-3 grid-rows-4 place-items-center gap-x-0 gap-y-2 px-5 py-5 w-full'>
            {tasks.map(task =>(
                <TaskCard key={uuidv4()} onCardClick={handleCardClick} task={task}/>
            ))}
        </ul>
    );
}

