import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';

type TaskNameType = {
    username: string;
}

const taskNames:TaskNameType[] = [
    {username: "user1"},
    {username: "user2"},
    {username: "user3"},
    {username: "user4"},
    {username: "user5"},
    {username: "user1"},
    {username: "user2"},
    {username: "user3"},
    {username: "user4"},
    {username: "user5"},
    {username: "user1"},
    {username: "user2"},
    {username: "user3"},
    {username: "user4"},
    {username: "user5"},
    {username: "user1"},
    {username: "user2"},
    {username: "user3"},
    {username: "user4"},
    {username: "user5"},
]

export default function TaskList() {
    const [tasks, setTasks] = useState(taskNames);

    return (
        <div className='tasklist w-full h-lvh px-5 py-2'>
            <input type="text"/>
            <ul className='flex flex-col gap-y-2 items-start'>
                {tasks.map(task => (
                   <li key={uuidv4()} className='px-2'>{task.username}</li> 
                ))}
            </ul>
        </div>
    );
}

