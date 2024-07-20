import React, { useState } from 'react';
import TaskGroup from './TaskGroup';

export default function ProjectSpace() {
    const [isAddTask, setIsAddTask] = useState(false); 
    const [task, setTask] = useState();

    const handleAddTaskSubmit = (e:React.FormEvent<HTMLFormElement>)=>{

    }

    return (
        <div className='flex flex-col justify-center p-2'>
            <div className='grid grid-cols-3 gap-5 px-5 py-5'>
                <TaskGroup title="To do" />
                <TaskGroup title="Doing" />
                <TaskGroup title="Done" />
            </div>
            <form onSubmit={handleAddTaskSubmit} className='flex justify-center items-center gap-x-5 border p-2'>
                <div className='flex flex-col'>
                    <label htmlFor="">Task name</label>
                    <input type="text" placeholder='Type a task name'/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="">Target date</label>
                    <input type="date" />
                </div>
                <button className='border p-2 rounded-full'>Add task</button>
            </form>
        </div>
    );
}