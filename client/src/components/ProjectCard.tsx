import React, { useState } from 'react';
import { useLoginStatus } from '../context/LoginStatusContext';
import { useNavigate } from 'react-router-dom';
import { ProjectType } from '../types/TaskMasterTypes';

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
        
        // if(userLogedIn !== project.hostName){
        //     alert("This is not your project !!");
        //     return;
        // }
        // if(userLogedIn !== "test@mail.com"){
        //     alert("This is not your project !!");
        //     return;
        // }
        onDeleteClick(project);
    }

    return (
        <div className='taskcard flex flex-col items-start gap-2 border p-2 w-5/6 h-56'>
            <h3>{project.name}</h3>
            <p>{project.hostName}</p>
            <p>{project.description}</p>
            <div className='flex justify-between w-full pt-3'>
                <button onClick={handleDeleteClick} className='bg-red-300 text-right border p-1 rounded'>Delete</button>
                <button onClick={handleDetailClick} className='bg-blue-300 text-right border p-1 rounded'>View detail</button>
            </div>
        </div>
    );
}

