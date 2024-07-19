import React from 'react';
import {v4 as uuidv4} from 'uuid';
import ProjectCard from './ProjectCard';

type TaskType = {
    title: string;
    description: string;
    hostId: string;
    guestId: string[];
    endDate: Date | undefined;
    createDate: Date | undefined;
    targetDate: Date | undefined;
}

type ProjectCardPropValueType = {
    name: string;
    hostId: string;
    gestId: string[];
    description: string;
    createDate: Date | undefined;
    targetDate: Date | undefined;
    endDate: Date | undefined;
    requestJoin: string[];
    tasks: TaskType[];
}

// type TaskCardPropValueType = {
//     projectname : string;
//     username : string;
//     description: string;
// }

type TasksPostPropsType = {
    projects:ProjectCardPropValueType[];
}

export default function ProjectsPost({projects}:TasksPostPropsType) {
    const handleCardClick = (e: React.MouseEvent)=>{
        console.log(e);
    }
    return (
        <ul className='taskcards grid grid-cols-3 grid-rows-4 place-items-center gap-x-0 gap-y-2 px-5 py-5 w-lvh border m-5 p-5'>
            {projects.map(project =>(
                <ProjectCard key={uuidv4()} onCardClick={handleCardClick} project={project}/>
            ))}
        </ul>
    );
}

