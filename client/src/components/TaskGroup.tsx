import React, { useState } from 'react';
import TaskCard from './TaskCard';

type TaskGroupProps = {
    title:string;
};

export default function TaskGroup({title}:TaskGroupProps) {
    const [tasksTodo, setTaskTodo] = useState([]);
    const [tasksDoing, setTaskDoing] = useState([]);
    const [tasksDone, setTaskDone] = useState([]);

    return (
        <div className='taskgroup col-span-1 flex flex-col items-center gap-y-4 px-1 py-2 border min-h-20 h-lvh'>
            <h3>{title}</h3>
            <ul>
                <TaskCard 
                    isTodo={title === "To do"? true : false} 
                    isDoing={title === "Doing"? true : false} 
                    isDone={title === "Done"? true : false}/>
            </ul>
        </div>
    );
}

