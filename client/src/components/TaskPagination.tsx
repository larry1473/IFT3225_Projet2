import React, { useState } from 'react';

type TaskPaginationPropsType = {
    tasksPerPage: number;
    tasksNum : number;
    onPageChangeClick: (pageNum:number)=>void;
}

export default function TaskPagination({tasksPerPage, tasksNum, onPageChangeClick}:TaskPaginationPropsType) {
    const pageNums:number[] = [];

    for(let i = 1; i <= Math.ceil(tasksNum / tasksPerPage); i++){
        pageNums.push(i);
    }
    
    return (
        <nav>
            <ul className='taskpagination flex items-center gap-2'>
                {pageNums.map(number => (
                    <li key={number} className='page_item border rounded-full'>
                        <a onClick={() => onPageChangeClick(number)} className='page_link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}