import React from 'react';
import { useLoginStatus } from '../context/LoginStatusProvider';
import { useNavigate } from 'react-router-dom';

type TaskType = {
    task:{
        projectname : string;
        username : string;
        date : string;
    }
}

export default function TaskCard({task}:TaskType) {
    const {hasLogin, toggleHasLogin} = useLoginStatus();
    const navigate = useNavigate();

    const handleCardClick = ()=>{
        navigate(`/Connection`)
    }

    return (
        <div onClick={handleCardClick} className='taskcard flex flex-col items-start border p-1 w-4/5'>
            <h3>{task.projectname}</h3>
            <p>{task.username}</p>
            <p>{task.date}</p>
        </div>
    );
}

