import React from 'react';
import { CiSearch } from "react-icons/ci";

export default function Filter() {
    return (
        <div className='flex justify-center items-center py-3'>
            <form className='filter_form flex gap-x-5 border px-8 py-3 rounded-xl'>
                <div className='flex flex-col'>
                    <label htmlFor="">Task name</label>
                    <input type="text" className='filter_input' placeholder='Type a task name'/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="">date</label>
                    <input type="date" className='filter_input' />
                </div>
                <button className='filter_search_btn'><CiSearch className='filter_search_icon size-8'/></button>
            </form>
        </div>
    );
}

