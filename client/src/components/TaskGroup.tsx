import TaskCard from './TaskCard';
import { TaskType } from '../types/TaskMasterTypes';
import {v4 as uuidv4} from 'uuid';


type TaskGroupProps = {
    title:string;
    tasklist: TaskType[];
};

export default function TaskGroup({title, tasklist}:TaskGroupProps) {
    
    return (
        <div className='flex flex-col items-center gap-y-4 px-5 py-5 border w-full h-lvh xl:w-1/2' role="region" aria-labelledby="task-group-heading">
            <h3 className='font-bold'>{title}</h3>
            <h3 className='font-sm'>{tasklist.length} tasks</h3>
            <ul className='taskgroup flex flex-col gap-y-2 w-full' aria-labelledby="task-list-heading">
                {tasklist.map(t => (
                    <TaskCard key={uuidv4()} title={title} task={t} />
                ))}
            </ul>
        </div>
    );
}

