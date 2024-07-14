import React, { useState } from 'react';
import TaskGroup from './TaskGroup';

const categories: string[]=[
    "To do",
    "Doing",
    "Done",
]

export default function TaskSpace() {
    const [taskCategories, setTaskCategories] = useState(categories);

    return (
        <div className='grid grid-cols-3 gap-5 px-5 py-5'>
            {taskCategories.map(cat =>(
                <TaskGroup title={cat} />
            ))}
        </div>
    );
}