import { useState, useEffect } from 'react';
import ProjectCards from '../components/ProjectCards';
import { CiSearch } from "react-icons/ci";

export default function Home() {
    const [filters, setFilters] = useState({
        projectname: "",
        username: ""
    });
    const [filtersInfo, setFiltersInfo] = useState({
        projectname: "",
        username: ""
    });

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setFiltersInfo(prev =>({
            ...prev,
            [name]:value
        }))
    }

    const handleFilterSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(filters);
        setFilters(filtersInfo);
    }
    
    return (
        <div className='flex flex-col items-center h-full'>

            {/* -----filter section---- */}
            <div className='flex justify-center items-center py-5'>
                <form onSubmit={handleFilterSubmit} className='filter_form flex items-center w-full border px-5 py-2 gap-x-5 rounded-lg' role="search" aria-labelledby="filter-form-heading">
                    <div className='flex flex-col justify-center items-start gap-1 border-r px-2'>
                        <label htmlFor="projectname" className='mx-2'>Project name</label>
                        <input id='projectname' name='projectname' onChange={handleInputChange} type="text" placeholder='Type a project name' className='filter_input' aria-label="Filter by project name"/>
                    </div>
                    <div className='flex flex-col justify-center border-r px-2'>
                        <label htmlFor="username" className='mx-2'>Username</label>
                        <input id='username' name="username" type="text" onChange={handleInputChange} placeholder='Type a username' className='filter_input' aria-label="Filter by username"/>
                    </div>
                    <button type="submit" aria-label="Search projects">
                        <CiSearch className='filter_search_icon size-6'/>
                    </button>
                </form>
            </div>
            
            <ProjectCards filters={filters}/>
        </div>
    );
}
