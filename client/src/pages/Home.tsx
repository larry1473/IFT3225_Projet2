import { useEffect } from 'react';
import axios from 'axios';
import Filter from '../components/Filter';
import ProjectCards from '../components/ProjectCards';

export default function Home() {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/');
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
            <ProjectCards />
        </div>
    );
}
