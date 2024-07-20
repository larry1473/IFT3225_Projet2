import React, { useState } from 'react';
import TaskGroup from './TaskGroup';

export default function ProjectSpace() {
    const [isAddTask, setIsAddTask] = useState(false); 
    const [task, setTask] = useState();

    const handleAddTaskSubmit = (e:React.FormEvent<HTMLFormElement>)=>{

    }

    return (
        <div className='flex flex-col justify-center p-2 w-full'>
            <form onSubmit={handleAddTaskSubmit} className='flex justify-center items-center gap-4 border px-5 py-4'>
                <div className='flex flex-col'>
                    <label htmlFor="taskname">Name</label>
                    <input id='taskname' name="taskname" type="text" placeholder='Type a task name'  className='projectadd_input w-56 p-1'/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="targetdate">Target date</label>
                    <input id='targetdate' name='targetdate' type="date" placeholder='Type a project description' className='projectadd_input w-56 p-1'/>
                </div>
                <div className='flex'>
                    <button type='submit' className='p-2 rounded-full border text-center'>Add task</button>
                </div>
            </form>
            
            <div className='grid grid-cols-3 gap-5 px-5 py-5'>
                <TaskGroup title="To do" />
                <TaskGroup title="Doing" />
                <TaskGroup title="Done" />
            </div>
        </div>
    );
}