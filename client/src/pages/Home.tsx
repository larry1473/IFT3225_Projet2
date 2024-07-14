import React from 'react';
import Filter from '../components/Filter';
import TaskCards from '../components/TaskCards';

export default function Home() {
    return (
        <div className='flex flex-col items-center h-full'>
            <Filter />
            <TaskCards />
        </div>
    );
}

