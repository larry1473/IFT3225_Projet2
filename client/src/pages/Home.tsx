import axios from 'axios';
import { useState, useEffect } from 'react';
import ProjectCards from '../components/ProjectCards';
import { CiSearch } from "react-icons/ci";
import { useProjects } from '../context/ProjectsContext';

export default function Home() {
    const {allProjects, setAllProjects} = useProjects();
    const [filters, setFilters] = useState({
        projectname: "",
        username: ""
    });

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setFilters(prev =>({
            ...prev,
            [name]:value
        }))
    }

    const handleFilterSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
    }
    
    return (
        <div className='flex flex-col items-center h-full'>

            {/* -----filter section---- */}
            <div className='flex justify-center items-center py-5'>
                <form onSubmit={handleFilterSubmit} className='filter_form flex items-center w-full border px-5 py-2 gap-x-5 rounded-lg'>
                    <div className='flex flex-col justify-center border-r px-2'>
                        <label htmlFor="projectname">Project name</label>
                        <input id='projectname' name='projectname' onChange={handleInputChange} type="text" placeholder='Type a project name' className='filter_input'/>
                    </div>
                    <div className='flex flex-col justify-center border-r px-2'>
                        <label htmlFor="username_input">Username</label>
                        <input id='username_input' type="text" onChange={handleInputChange} placeholder='Type a username' className='filter_input'/>
                    </div>
                    <button><CiSearch className='filter_search_icon size-6'/></button>
                </form>
            </div>
            
            {/* <ProjectCards allProjects={allProjects} onFetchProjects={toggleFetch} filters={filters}/> */}
            <ProjectCards filters={filters}/>
        </div>
    );
}
