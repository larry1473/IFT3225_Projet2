import axios from 'axios';
import { useState, useEffect } from 'react';
import Filter from '../components/Filter';
import ProjectCards from '../components/ProjectCards';

export default function Home() {

    return (
        <div className='flex flex-col items-center h-full'>
            <Filter />
            <ProjectCards />
        </div>
    );
}
