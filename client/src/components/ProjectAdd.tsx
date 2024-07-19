import { hostname } from 'os';
import React, { useState } from 'react';

type TaskType = {
    title: string;
    description: string;
    hostId: string;
    guestId: string[];
    endDate: Date | undefined;
    createDate: Date | undefined;
    targetDate: Date | undefined;
}

type ProjectType = {
    name: string;
    hostId: string;
    gestId: string[];
    description: string;
    createDate: Date | undefined;
    targetDate: Date | undefined;
    endDate: Date | undefined;
    requestJoin: string[];
    tasks: TaskType[];
}

type ProjectAddPropsType = {
    onAddClick: (project : ProjectType)=> void;
}

export default function ProjectAdd({onAddClick}:ProjectAddPropsType) {
    const [projectInfo, setProjectInfo] = useState({
        name: "",
        hostId: "",
        gestId: [],
        description: "",
        createDate: undefined,
        targetDate: undefined,
        endDate: undefined,
        requestJoin: [],
        tasks:[]
    });
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setProjectInfo(prev=>({
            ...prev,
            [name]:value,
        }))
    }
    const handleAddSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        onAddClick(projectInfo);
    }
    return (
        <form onSubmit={handleAddSubmit} className='flex items-center gap-4 border px-5 py-2'>
            <div className='flex flex-col'>
                <label htmlFor="name">name</label>
                <input id='name' name="name" type="text" onChange={handleInputChange} placeholder='Type a project name'  className='projectadd_input w-56 p-1'/>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="description">description</label>
                <input id='description' name='description' type="text" onChange={handleInputChange} placeholder='Type a project description' className='projectadd_input w-56 p-1'/>
            </div>
            <button type='submit' className='p-2 rounded-full border'>Add project</button>
        </form>
    );
}

