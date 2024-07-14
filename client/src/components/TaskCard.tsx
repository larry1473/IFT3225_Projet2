import React from 'react';

type TaskType = {
    task:{
        taskname : string;
        username : string;
        date : string;
    }
}

export default function TaskCard({task}:TaskType) {
    return (
        <div className='flex flex-col items-start border'>
            <h3>{task.taskname}</h3>
            <p>{task.username}</p>
            <p>{task.date}</p>
        </div>
    );
}

