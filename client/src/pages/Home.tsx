import React from 'react';
import Filter from '../components/Filter';
import TasksCards from '../components/TasksCards';

export default function Home() {
    return (
        <div className='h-lvh'>
            <Filter />
            <TasksCards />
        </div>
    );
}

