import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import TaskCard from './TaskCard';

type TaskCardPropValueType = {
    taskname : string;
    username : string;
    date : string;
}

const testData: TaskCardPropValueType[] = [
    {
        taskname : "task1",
        username : "user1",
        date : "date1",
    },
    {
        taskname : "task2",
        username : "user2",
        date : "date2",
    },
    {
        taskname : "task3",
        username : "user3",
        date : "date3",
    },
    {
        taskname : "task4",
        username : "user4",
        date : "date4",
    },
    {
        taskname : "task5",
        username : "user5",
        date : "date5",
    },
    {
        taskname : "task6",
        username : "user6",
        date : "date6",
    },
    {
        taskname : "task7",
        username : "user7",
        date : "date7",
    },
    {
        taskname : "task8",
        username : "user8",
        date : "date8",
    },
    {
        taskname : "task9",
        username : "user9",
        date : "date9",
    },
    {
        taskname : "task10",
        username : "user10",
        date : "date10",
    },
]

export default function TaskCards() {
    const [tasks, setTasks] = useState<TaskCardPropValueType[]>(testData);

    return (
        <div className='taskcards flex flex-col gap-x-1 gap-y-2 px-5'>
            {tasks.map((task)=>(
                <TaskCard key={uuidv4()} task={task}/>
            ))}
        </div>
    );
}

