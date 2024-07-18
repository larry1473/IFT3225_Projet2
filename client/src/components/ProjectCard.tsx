import React, { useState } from 'react';
import { useLoginStatus } from '../context/LoginStatusContext';
import { useNavigate } from 'react-router-dom';

type ProjectCardPropsType = {
    onCardClick: (e:React.MouseEvent) => void;
    task:{
        projectname : string;
        username : string;
        description : string;
    }
}

export default function ProjectCard({onCardClick, task}:ProjectCardPropsType) {
    const {hasLogedin, setHasLogedin} = useLoginStatus();
    const navigate = useNavigate();

    const handleCardClick = (e:React.MouseEvent)=>{
        console.log(e.target);
        
        if(!hasLogedin){
            navigate(`/connection/login`);
            return;
        } else {
            navigate(`../taskcards/${task.projectname}`);
        }
    }

    return (
        <div onClick={handleCardClick} className='taskcard flex flex-col items-start border p-1 w-4/5'>
            <h3>{task.projectname}</h3>
            <p>{task.username}</p>
            <p>{task.description}</p>
        </div>
    );
}

