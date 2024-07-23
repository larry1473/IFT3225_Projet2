import React, { useEffect, useState } from 'react';
import { TaskType } from '../types/TaskMasterTypes';
import { useProjects } from '../context/ProjectsContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useLoginStatus } from '../context/LoginStatusContext';


type TaskCardPropsType = {
    title: string;
    task: TaskType;
}

export default function TaskCard({title, task}:TaskCardPropsType) {
    const {projectid} = useParams();
    const {username} = useLoginStatus();
    const {projectSelected, setProjectSelected, fetchProjects} = useProjects();
    
    // add a task guest
    const handleJoinClick = (e:React.MouseEvent)=>{
        console.log("Join task");
        postAddTaskGuest(localStorage.getItem('username') || username);
    }
    const postAddTaskGuest = async(guestname:string)=>{
        if(task.guestNames.includes(guestname)){
            alert("You are already on the list!");
            return;
        }
        
        const token = localStorage.getItem('token');

        try{
            const res = await axios.post(`http://localhost:3000/api/v1/projects/${projectid}/tasks/${task._id}/guests`, guestname,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("add project response message : ", res.data.message);
            setProjectSelected(prev => prev?{
                ...prev,
                guestNames:[...prev.guestNames, guestname]
            }: prev)
            fetchProjects();
        } catch(err){
            console.error(err);
        }
    }

    // create endDate & move to Done
    const handleDoneClick = (e:React.MouseEvent)=>{
        console.log("Task finished");
        
        updateTaskEndDate();
    }
    const updateTaskEndDate = async ()=>{
        const token = localStorage.getItem('token');
        const enddate = {endDate : new Date()}
        const endDateJson = JSON.stringify(enddate);
        console.log(endDateJson);
        
        try{
            const res = await axios.post(`http://localhost:3000/api/v1/projects/${projectid}/tasks/${task._id}`, endDateJson,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("finish task response message : ", res.data.message);
            console.log(res.data);
            setProjectSelected(res.data.project);
            fetchProjects();
        } catch (err){
            console.error(err);
        }
    }

    // delete a task guest
    const handleDeleteClick = (e:React.MouseEvent)=>{
        console.log("delete task");
        deleteTask();
    }
    const deleteTask = async()=>{
        const token = localStorage.getItem('token');

        try{
            const res = await axios.delete(`http://localhost:3000/api/v1/projects/${projectid}/tasks/${task._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("delete task response message : ", res.data.message);
            console.log(res.data);
            setProjectSelected(res.data.project);
            fetchProjects();
        } catch(err){
            console.error(err);
        }
    }

    return (
        <li className='flex flex-col justify-between border gap-x-2 px-5 py-2 w-full rounded-md'>
            <div className='flex flex-col gap-y-2'>
                <p className='font-bold'>Name : {task.title}</p>
                <p>Host : {task.hostName}</p>
                <p>Target date : {task.targetDate.toString().slice(0, 10)}</p>
                <p>{task.guestNames.length} teammates</p>
            </div>
            {(title === "Doing") && <div className='flex gap-y-2 justify-between py-2'>
                            <button onClick={handleJoinClick} className='bg-green-100 p-1 w-14 h-max rounded'>Join</button>
                            <button onClick={handleDoneClick} className='bg-blue-100 p-1 w-14 h-max rounded'>Done</button>
                            <button onClick={handleDeleteClick} className='bg-red-100 p-1 w-14 h-max rounded'>Delete</button>
                        </div>
            }
            {(title === "Done") && <div className='flex justify-center items-center'>
                            <button onClick={handleDeleteClick} className='bg-red-100 p-1 w-14 h-max rounded'>Delete</button>
                        </div>
            }
        </li>
    );
}