import React from 'react';
import Filter from '../components/Filter';
import TaskSpace from '../components/TaskSpace';
import { useLoginStatus } from '../context/LoginStatusProvider';
import HomeDefaultMsg from '../components/HomeDefaultMsg';
import TaskAdd from '../components/TaskAdd';
import TaskList from '../components/TaskList';

export default function Home() {
    const {hasLogin, toggleHasLogin} = useLoginStatus();
    return (
        <div className='flex justify-center h-full'>
            <section className='filter_section w-1/4 flex flex-col items-center h-lvh py-2 border-r'>
                <Filter />
                <TaskAdd />
                <TaskList />
            </section>

            <section className='cards_section w-3/4 h-full'>
                {!hasLogin && <HomeDefaultMsg />}
                {hasLogin && <TaskSpace />}
            </section>
        </div>
    );
}

