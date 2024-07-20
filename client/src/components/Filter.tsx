import React, {useState} from 'react';
import { CiSearch } from "react-icons/ci";

export default function Filter() {
    const [filterInfo, setFilterInfo] = useState({
        projectname: "",
        username: ""
    })



    return (
        <div className='flex justify-center items-center py-5'>
            <form className='filter_form flex items-center w-full border px-5 py-2 gap-x-4 rounded-lg'>
                <div className='flex flex-col justify-center border-r px-2'>
                    <label htmlFor="projectname">Project name</label>
                    <input id='projectname' name='projectname' type="text" placeholder='Type a project name' className='filter_input'/>
                </div>
                <div className='flex flex-col justify-center border-r px-2'>
                    <label htmlFor="username_input">Username</label>
                    <input id='username_input' type="text" placeholder='Type a username' className='filter_input'/>
                </div>
                <button><CiSearch className='filter_search_icon size-6'/></button>
            </form>
        </div>
    );
}

