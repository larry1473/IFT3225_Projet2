import React, { useEffect, useState } from 'react';
import TaskGroup from './TaskGroup';
import { useProjects } from '../context/ProjectsContext';
import {TaskType, TaskAddType} from '../types/TaskMasterTypes';
import { useLoginStatus } from '../context/LoginStatusContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function ProjectSpace() {
    const {projectid} = useParams();
    const {username} = useLoginStatus();
    const {fetchProjects, projectSelected, setProjectSelected} = useProjects();
    const [taskInfo, setTaskInfo] = useState({
        title: "",
        hostName: username,
        guestNames: ["Jane Smith", "Bob Johnson"],
        createdDate: new Date(),
        targetDate: new Date(),
        endDate: new Date(),
    })
    const [tasksDoing, setTaskDoing] = useState<TaskType[]>(projectSelected?.tasks.filter(t => new Date(t.endDate) > new Date()) || []);
    const [tasksDone, setTaskDone] = useState<TaskType[]>(projectSelected?.tasks.filter(t => new Date(t.endDate) <= new Date()) || []);

    // test
    useEffect(()=>{
        if(projectSelected){
            setTaskDoing(projectSelected?.tasks.filter(t => new Date(t.endDate) > new Date()));
            setTaskDone(projectSelected?.tasks.filter(t => new Date(t.endDate) <= new Date()));
        }
        
    }, [projectSelected]);

    const handleTitleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setTaskInfo(prev=>({
            ...prev,
            title:e.target.value,
        }))
    }
    const handleTargetDateChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const newTargetDate = new Date(e.target.value);

        // if(newTargetDate < projectInfo.createDate){
        //     alert("Target date cannot be earlier than create date");
        //     return;
        // }

        setTaskInfo(prev=>({
            ...prev,
            targetDate:new Date(e.target.value),
        }))
    }

    // add a task
    const handleAddTaskSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        console.log("Add task");
        e.preventDefault();
        console.log(taskInfo);
        postAddTask();
    }
    const postAddTask = async ()=>{
        const token = localStorage.getItem('token');
        setTaskInfo(prev=>({
            ...prev,
            hostName:"name3333",
            endDate:new Date(taskInfo.targetDate)
        }))
        const taskJson = JSON.stringify(taskInfo);
        console.log(taskJson);
        
        try{
            const res = await axios.post(`http://localhost:3000/api/v1/projects/${projectid}`, taskJson, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log(res.data);
            
            console.log("add project response message : ", res.data.message);
            const projectUpdated = res.data.project;
            console.log(projectUpdated);
            setProjectSelected(projectSelected);
            console.log(projectSelected);
            
            // setProjectSelected(prev=>prev ? {
            //     ...prev,
            //     tasks: projectUpdated.tasks
            // } : prev);

            fetchProjects();
        } catch (err){
            console.error(err);
        }
    }


    return (
        <div className='flex flex-col justify-center p-2 w-full'>
            
            {/* Project info */}
            <div className='flex flex-col items-start justify-center h-max'>
                <p>Name : {projectSelected?.name}</p>
                <p>Owner : {projectSelected?.hostName}</p>
                <p>Description : {projectSelected?.description}</p>
            </div>
            
            {/* Add task */}
            <form onSubmit={handleAddTaskSubmit} className='flex justify-center items-center gap-4 border px-5 py-4'>
                <div className='flex flex-col'>
                    <label htmlFor="title">Name</label>
                    <input onChange={handleTitleChange} id='title' name="title" type="text" placeholder='Type a task name'  className='projectadd_input w-56 p-1'/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="targetDate">Target date</label>
                    <input onChange={handleTargetDateChange} id='targetDate' name='targetDate' type="date" placeholder='Type a project description' className='projectadd_input w-56 p-1'/>
                </div>
                <div className='flex'>
                    <button type='submit' className='p-2 rounded-full border text-center'>Add task</button>
                </div>
            </form>
            
            <div className='flex gap-5 px-5 py-5'>
                <TaskGroup title="Doing" tasklist={tasksDoing}/>
                <TaskGroup title="Done" tasklist={tasksDone}/>
            </div>
        </div>
    );
}