import React from 'react';
import {v4 as uuidv4} from 'uuid';
import ProjectCard from './ProjectCard';
import { ProjectType } from '../types/TaskMasterTypes';

type TasksPostPropsType = {
    projects:ProjectType[];
}

export default function ProjectsPost({projects}:TasksPostPropsType) {
    const handleCardClick = (e: React.MouseEvent)=>{
        console.log(e);
    }
    return (
        <ul className='taskcards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  place-items-center gap-x-0 gap-y-2 px-5 py-5 border m-5 p-5 w-full'>
            {projects.map(project =>(
                <ProjectCard key={uuidv4()} onCardClick={handleCardClick} project={project} />
            ))}
        </ul>
    );
}

