import React from 'react';
import { useParams } from 'react-router-dom';
import TaskSpace from './TaskSpace';
import TaskList from './UserList';
import UserList from './UserList';
import RequestJoinList from './RequestJoinList';

export default function ProjectDetail() {
    const {taskid} = useParams();
    console.log(taskid);
    
    return (
        <div className='grid grid-cols-4'>
            <div className='col-span-1'>
                <UserList />
                <RequestJoinList />
            </div>
            <div className='col-span-3'>
                <TaskSpace />
            </div>
        </div>
    );
}

