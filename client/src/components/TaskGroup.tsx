import React from 'react';
import TaskCards from './TaskCards';

type TaskGroupProps = {
    title:string;
};

export default function TaskGroup({title}:TaskGroupProps) {
    return (
        <div className='taskgroup col-span-1 flex flex-col gap-y-4 px-1 py-2 border h-4/5'>
            <h3>{title}</h3>
            <TaskCards />
            <button>+ Add a card</button>
        </div>
    );
}

