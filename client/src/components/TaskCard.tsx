import React from 'react';

type TaskCardPropsType = {
    isTodo: boolean;
    isDoing: boolean;
    isDone: boolean
}

export default function TaskCard({isTodo, isDoing, isDone}:TaskCardPropsType) {

    return (
        <li className='border px-5 py-2'>
            <p>Name</p>
            <p>task description</p>
            <p>Host : user1</p>
            <p>target date</p>
            {isTodo && <div className='flex justify-between'><button>Doing</button><button>Cancel</button></div>}
            {isDoing && <div className='flex justify-between'><button>Done</button><button>Cancel</button></div>}
            {isDone && <div className='flex justify-between'><button>Cancel</button></div>}
        </li>
    );
}