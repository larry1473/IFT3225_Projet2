import React from 'react';

type TaskCardPropsType = {
    isDoing: boolean;
    isDone: boolean
}

export default function TaskCard({isDoing, isDone}:TaskCardPropsType) {

    return (
        <li className='flex justify-between border px-5 py-2 w-1/2 rounded-md'>
            <div className='flex flex-col'>
                <p>Name</p>
                <p>Host : user1</p>
                <p>target date</p>
                <p>teammates</p>
            </div>
            {isDoing && <div className='flex flex-col justify-between'>
                            <button className='bg-blue-100 p-1 w-14 h-max rounded'>Done</button>
                            <button className='bg-red-100 p-1 w-14 h-max rounded'>Cancel</button>
                        </div>
            }
            {isDone && <div className='flex justify-center items-center'>
                            <button className='bg-red-100 p-1 w-14 h-max rounded'>Delete</button>
                        </div>
            }
        </li>
    );
}