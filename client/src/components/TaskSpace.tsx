import React, { useEffect, useState } from 'react';
import TaskGroup from './TaskGroup';
import { useProjects } from '../context/ProjectsContext';
import {TaskType} from '../types/TaskMasterTypes';
import { useLoginStatus } from '../context/LoginStatusContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function ProjectSpace() {
    const {projectid} = useParams();
    const {username} = useLoginStatus();
    const {fetchProjects, projectSelected, setProjectSelected} = useProjects();
    const [taskInfo, setTaskInfo] = useState({
        title: "",
        hostName: localStorage.getItem("username") || username,
        guestNames: [],
        createdDate: new Date(),
        targetDate: new Date(),
        endDate: new Date(),
    })
    const [tasksDoing, setTaskDoing] = useState<TaskType[]>(projectSelected?.tasks.filter(t => new Date(t.endDate) > new Date()) || []);
    const [tasksDone, setTaskDone] = useState<TaskType[]>(projectSelected?.tasks.filter(t => new Date(t.endDate) <= new Date()) || []);

    // test
    useEffect(()=>{
        if(projectSelected){
            const now = new Date();
            now.setHours(now.getMinutes() - 5);
            setTaskDoing(projectSelected?.tasks.filter(t => new Date(t.endDate) > now));
            setTaskDone(projectSelected?.tasks.filter(t => new Date(t.endDate) <= now));
        }
    }, [projectSelected]);

    const handleTitleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setTaskInfo(prev=>({
            ...prev,
            title:e.target.value,
        }))
    }
    const handleTargetDateChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setTaskInfo(prev=>({
            ...prev,
            targetDate:new Date(e.target.value),
        }))
    }

    // add a task
    const handleAddTaskSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        // console.log("Add task");
        e.preventDefault();;
        postAddTask();
    }
    const postAddTask = async ()=>{
        const token = localStorage.getItem('token');
        
        setTaskInfo(prev=>({
            ...prev,
            endDate:new Date(taskInfo.targetDate)
        }))
        const taskJson = JSON.stringify(taskInfo);
        
        
        try{
            const res = await axios.post(`http://localhost:3000/api/v1/projects/${projectid}`, taskJson, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            // console.log("add project response message : ", res.data.message);
            const projectUpdated = res.data.project;            
            setProjectSelected(projectUpdated);

            fetchProjects();
        } catch (err){
            console.error(err);
        }
    }


    return (
        <div className='flex flex-col justify-center p-2 w-full' role="region" aria-labelledby="project-info-heading">
            
            {/* Project info */}
            <div className='flex flex-col items-start justify-center h-max'>
                <p>Name : {projectSelected?.name}</p>
                <p>Owner : {projectSelected?.hostName}</p>
                <p>Description : {projectSelected?.description}</p>
            </div>
            
            {/* Add task */}
            <form onSubmit={handleAddTaskSubmit} className='flex flex-col sm:flex-row xl:flex-row justify-center items-center gap-4 border px-5 py-4' role="form" aria-labelledby="add-task-heading">
                <div className='flex flex-col'>
                    <label htmlFor="title">Name</label>
                    <input onChange={handleTitleChange} id='title' name="title" type="text" placeholder='Type a task name'  className='projectadd_input w-56 p-1' aria-required="true"/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="targetDate">Target date</label>
                    <input onChange={handleTargetDateChange} id='targetDate' name='targetDate' type="date" placeholder='Type a project description' className='projectadd_input w-56 p-1' aria-required="true"/>
                </div>
                <div className='flex'>
                    <button type='submit' className='p-2 rounded-full border text-center' aria-label="Add task">Add task</button>
                </div>
            </form>
            
            <div className='flex flex-col md:flex-row  gap-5 px-5 py-5'>
                <TaskGroup title="Doing" tasklist={tasksDoing} aria-labelledby="doing-tasks-heading"/>
                <TaskGroup title="Done" tasklist={tasksDone} aria-labelledby="done-tasks-heading"/>
            </div>
        </div>
    );
}