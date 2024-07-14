import React from 'react';

export default function TaskAdd() {
    return (
        <div className='flex items-center gap-x-1 p-2'>
            <input type="text" placeholder='Add new task' className='task_add_input px-2 py-1 border'/>
            <button className='border px-2 text-lg rounded'>+</button>
        </div>
    );
}