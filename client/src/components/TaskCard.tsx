import React from 'react';
import { TaskType } from '../types/TaskMasterTypes';

type TaskCardPropsType = {
    title: string;
    task: TaskType;
}

export default function TaskCard({title, task}:TaskCardPropsType) {

    return (
        <li className='flex flex-col justify-between border gap-x-2 px-5 py-2 w-full rounded-md'>
            <div className='flex flex-col gap-y-2'>
                <p>Name : {task.title}</p>
                <p>Host : {task.hostName}</p>
                <p>Target date : {task.targetDate.toString().slice(0, 10)}</p>
                <p>{task.guestNames.length} teammates</p>
            </div>
            {(title === "Doing") && <div className='flex gap-y-2 justify-between py-2'>
                            <button className='bg-green-100 p-1 w-14 h-max rounded'>Join</button>
                            <button className='bg-blue-100 p-1 w-14 h-max rounded'>Done</button>
                            <button className='bg-red-100 p-1 w-14 h-max rounded'>Cancel</button>
                        </div>
            }
            {(title === "Done") && <div className='flex justify-center items-center'>
                            <button className='bg-red-100 p-1 w-14 h-max rounded'>Delete</button>
                        </div>
            }
        </li>
    );
}