import React from 'react';
import { useParams } from 'react-router-dom';
import TaskSpace from './TaskSpace';
import TaskList from './TaskList';

export default function TaskDetail() {
    const {taskid} = useParams();
    console.log(taskid);
    
    return (
        <div className='grid grid-cols-4'>
            <div className='col-span-1'>
                <TaskList />
            </div>
            <div className='col-span-3'>
                <TaskSpace />
            </div>
        </div>
    );
}

