import React, { useState } from 'react';
import { useLoginStatus } from '../context/LoginStatusContext';
import { useNavigate } from 'react-router-dom';

type TaskType = {
    title: string;
    description: string;
    hostId: string;
    guestId: string[];
    endDate: Date | undefined;
    createDate: Date | undefined;
    targetDate: Date | undefined;
}

type ProjectType = {
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

type ProjectCardPropsType = {
    onCardClick: (e:React.MouseEvent) => void;
    project:ProjectType;
}

export default function ProjectCard({onCardClick, project}:ProjectCardPropsType) {
    const {hasLogedin, setHasLogedin} = useLoginStatus();
    const navigate = useNavigate();

    const handleCardClick = (e:React.MouseEvent)=>{
        console.log(e.target);
        
        if(!hasLogedin){
            navigate(`/connection/login`);
            return;
        } else {
            navigate(`../taskcards/${project.name}`);
        }
    }

    return (
        <div onClick={handleCardClick} className='taskcard flex flex-col items-start gap-2 border p-1 w-4/5'>
            <h3>{project.name}</h3>
            <p>{project.hostId}</p>
            <p>{project.description}</p>
        </div>
    );
}

