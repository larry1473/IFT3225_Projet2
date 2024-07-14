import React from 'react';
import { CiSearch } from "react-icons/ci";

export default function Filter() {
    return (
        <div className='flex justify-center items-center p-2'>
            <form className='filter_form flex items-center w-full border px-3 rounded-md'>
                <input type="text" placeholder='Type a task name' className='filter_input'/>
                <CiSearch className='filter_search_icon size-4'/>
            </form>
        </div>
    );
}

