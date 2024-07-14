import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

type TaskPaginationPropsType = {
    currentPage: number;
    tasksPerPage: number;
    tasksNum : number;
    onPageChangeClick: (pageNum:number)=>void;
}

export default function TaskPagination({currentPage, tasksPerPage, tasksNum, onPageChangeClick}:TaskPaginationPropsType) {
    const pageNums:number[] = [];

    for(let i = 1; i <= Math.ceil(tasksNum / tasksPerPage); i++){
        pageNums.push(i);
    }

    const handleLeftClick = ()=>{
        const newPage = currentPage;
        if(newPage === 1) return;
        onPageChangeClick(currentPage - 1);
    }
    
    const handleRightClick = ()=>{
        const newPage = currentPage;
        const lastPage = pageNums[pageNums.length - 1];
        if(newPage === lastPage) return;
        onPageChangeClick(currentPage + 1);
    }
    
    return (
        <nav className='flex items-center gap-3'>
            <button onClick={handleLeftClick}><FaAngleLeft /></button>
            <ul className='taskpagination flex items-center gap-2'>
                {pageNums.map(number => (
                    <li key={uuidv4()} className={`page_number ${currentPage === number ? "selected" : ""} border px-2 rounded-full`}>
                        <a onClick={() => onPageChangeClick(number)} className='page_link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
            <button onClick={handleRightClick}><FaAngleRight /></button>
        </nav>
    );
}