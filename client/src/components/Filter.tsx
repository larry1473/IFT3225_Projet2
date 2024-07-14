import React from 'react';
import { CiSearch } from "react-icons/ci";

export default function Filter() {
    return (
        <div className='flex justify-center items-center py-5'>
            <form className='filter_form flex items-center w-full border px-5 py-2 gap-x-4 rounded-lg'>
                <div className='flex flex-col justify-center border-r px-2'>
                    <label htmlFor="taskname_input">Project name</label>
                    <input id='taskname_input' type="text" placeholder='Type a task name' className='filter_input'/>
                </div>
                <div className='flex flex-col justify-center border-r px-2'>
                    <label htmlFor="username_input">User name</label>
                    <input id='username_input' type="text" placeholder='Type a user name' className='filter_input'/>
                </div>
                <button><CiSearch className='filter_search_icon size-4'/></button>
            </form>
        </div>
    );
}

