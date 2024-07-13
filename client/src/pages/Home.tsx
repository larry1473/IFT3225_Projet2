import React from 'react';
import Filter from '../components/Filter';
import TasksCards from '../components/TasksCards';
import { useLoginStatus } from '../context/LoginStatusProvider';

export default function Home() {
    const {hasLogin, toggleHasLogin} = useLoginStatus();
    return (
        <div className='h-lvh'>
            <Filter />
            {hasLogin && <TasksCards />}
            {!hasLogin && <p>You must login before</p>}
        </div>
    );
}

