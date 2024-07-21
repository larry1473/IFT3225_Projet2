import React, { useState } from 'react';
import TaskGroup from './TaskGroup';
import { useProjects } from '../context/ProjectsContext';
import {TaskType, TaskAddType} from '../types/TaskMasterTypes';
import { useLoginStatus } from '../context/LoginStatusContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function ProjectSpace() {
    const {projectid} = useParams();
    const {username} = useLoginStatus();
    const {fetchProjects} = useProjects();
    const [taskInfo, setTaskInfo] = useState({
        title: "",
        description:"",
        hostName: username,
        guestNames: [],
        createDate: new Date(),
        targetDate: new Date(),
        endDate: new Date(),
    })
    const {projectSelected, setProjectSelected} = useProjects();
    const [tasksDoing, setTaskDoing] = useState<TaskType[]>(makeTasksDoingList(projectSelected?.tasks || []));
    const [tasksDone, setTaskDone] = useState<TaskType[]>(makeTasksDoneList(projectSelected?.tasks || []));

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setTaskInfo(prev=>({
            ...prev,
            [name]:value,
        }))
    }

    const handleAddTaskSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(taskInfo);
        
        setTaskInfo(prev=>({
            ...prev,
            hostName:"name3333",
            endDate:new Date(taskInfo.targetDate)
        }))

        if(projectSelected){
            postAddTask();
        }
    }

    const postAddTask = async ()=>{
        const token = localStorage.getItem('token');
        const taskJson = JSON.stringify(taskInfo);

        try{
            const res = await axios.post(`http://localhost:3000/api/v1/projects/${projectid}`, taskJson, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("add project response message : ", res.data.message);
            console.log("add project response username : ", res.data.userName);
            fetchProjects();
        } catch (err){
            console.error(err);
        }
    }


    return (
        <div className='flex flex-col justify-center p-2 w-full'>
            
            {/* Project info */}
            <div className='flex flex-col items-start justify-center h-max'>
                <p>{projectSelected?.name}</p>
                <p>{projectSelected?.hostName}</p>
                <p>{projectSelected?.description}</p>
            </div>
            
            {/* Add task */}
            <form onSubmit={handleAddTaskSubmit} className='flex justify-center items-center gap-4 border px-5 py-4'>
                <div className='flex flex-col'>
                    <label htmlFor="title">Name</label>
                    <input onChange={handleInputChange} id='title' name="title" type="text" placeholder='Type a task name'  className='projectadd_input w-56 p-1'/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="targetDate">Target date</label>
                    <input onChange={handleInputChange} id='targetDate' name='targetDate' type="date" placeholder='Type a project description' className='projectadd_input w-56 p-1'/>
                </div>
                <div className='flex'>
                    <button type='submit' className='p-2 rounded-full border text-center'>Add task</button>
                </div>
            </form>
            
            <div className='grid grid-cols-2 gap-5 px-5 py-5'>
                <TaskGroup title="Doing" />
                <TaskGroup title="Done" />
            </div>
        </div>
    );
}

function makeTasksDoingList (tasks: TaskType[]){
    const now = new Date();
    const doingList = tasks.filter(t => t.endDate > now);

    return doingList;
}
function makeTasksDoneList (tasks: TaskType[]){
    const now = new Date();
    const doingList = tasks.filter(t => t.endDate <= now);

    return doingList;
}