import React, { useState } from 'react';
import { useLoginStatus } from '../context/LoginStatusProvider';
import { useNavigate } from 'react-router-dom';

type TaskCardPropsType = {
    onCardClick: (e:React.MouseEvent) => void;
    task:{
        projectname : string;
        username : string;
        date : string;
    }
}

export default function TaskCard({onCardClick, task}:TaskCardPropsType) {
    const {hasLogin, toggleHasLogin} = useLoginStatus();
    const navigate = useNavigate();
    const [canDisplayCard, setCanDisplayCard] = useState(false);

    const handleCardClick = (e:React.MouseEvent)=>{
        console.log(e.target);
        
        if(!hasLogin){
            navigate(`/Connection`);
            return;
        } else {
            setCanDisplayCard(true);
        }
    }

    return (
        <div onClick={handleCardClick} className='taskcard flex flex-col items-start border p-1 w-4/5'>
            <h3>{task.projectname}</h3>
            <p>{task.username}</p>
            <p>{task.date}</p>
        </div>
    );
}

