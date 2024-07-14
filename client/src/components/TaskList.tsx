import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';

type TaskNameType = {
    name: string;
}

const taskNames:TaskNameType[] = [
    {name: "task1"},
    {name: "task2"},
    {name: "task3"},
    {name: "task4"},
    {name: "task5"},
    {name: "task6"},
    {name: "task7"},
    {name: "task8"},
    {name: "task9"},
    {name: "task10"},
    {name: "task1"},
    {name: "task2"},
    {name: "task3"},
    {name: "task4"},
    {name: "task5"},
    {name: "task6"},
    {name: "task7"},
    {name: "task8"},
    {name: "task9"},
    {name: "task10"},
    {name: "task1"},
    {name: "task2"},
    {name: "task3"},
    {name: "task4"},
    {name: "task5"},
    {name: "task6"},
    {name: "task7"},
    {name: "task8"},
    {name: "task9"},
    {name: "task10"},
]

export default function TaskList() {
    const [tasks, setTasks] = useState(taskNames);

    return (
        <div className='tasklist w-full px-5 py-2'>
            <ul className='flex flex-col gap-y-2 items-start'>
                {tasks.map(task => (
                   <li key={uuidv4()} className='px-2'>{task.name}</li> 
                ))}
            </ul>
        </div>
    );
}

