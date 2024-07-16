import React from 'react';
import ProjectCards from './ProjectCards';

type TaskGroupProps = {
    title:string;
};

export default function TaskGroup({title}:TaskGroupProps) {
    return (
        <div className='taskgroup col-span-1 flex flex-col gap-y-4 px-1 py-2 border min-h-20'>
            <h3>{title}</h3>
            {/* <ProjectCards /> */}
            <button>+ Add a card</button>
        </div>
    );
}

