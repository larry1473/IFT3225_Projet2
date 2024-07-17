import axios from 'axios';
import { useState, useEffect } from 'react';
import Filter from '../components/Filter';
import ProjectCards from '../components/ProjectCards';

export default function Home() {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/');
                console.log('Data from server:', response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='flex flex-col items-center h-full'>
            <Filter />
            {/* <div></div> */}
            <ProjectCards />
        </div>
    );
}
