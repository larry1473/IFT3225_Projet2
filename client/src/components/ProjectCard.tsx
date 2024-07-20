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
    onDeleteClick: (project: ProjectType) => void;
}

export default function ProjectCard({onCardClick, project, onDeleteClick}:ProjectCardPropsType) {
    const {hasLogedin, setHasLogedin, userLogedIn} = useLoginStatus();
    const navigate = useNavigate();

    const handleDetailClick = (e:React.MouseEvent)=>{
        console.log(e.target);
        
        if(!hasLogedin){
            navigate(`/connection/login`);
            return;
        } else {
            navigate(`../taskcards/${project.name}`);
        }
    }

    const handleDeleteClick = (e:React.MouseEvent)=>{
        if(!hasLogedin){
            navigate(`/connection/login`);
            return;
        }

        console.log(userLogedIn);
        
        if(userLogedIn !== project.hostId){
            alert("This is not your project !!");
            return;
        }
        // if(userLogedIn !== "test@mail.com"){
        //     alert("This is not your project !!");
        //     return;
        // }
        onDeleteClick(project);
    }

    return (
        <div className='taskcard flex flex-col items-start gap-2 border p-2 w-5/6 h-min'>
            <h3>{project.name}</h3>
            <p>{project.hostId}</p>
            <p>{project.description}</p>
            <div className='flex justify-between w-full pt-3'>
                <button onClick={handleDeleteClick} className='text-right border p-1'>Delete</button>
                <button onClick={handleDetailClick} className='text-right border p-1'>View detail</button>
            </div>
        </div>
    );
}

