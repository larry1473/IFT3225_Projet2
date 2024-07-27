import { useState, useEffect } from 'react';
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
    const [currTaskGuestnames, setCurrTaskGuestnames] = useState(task.guestNames);

    // add a task guest
    const handleJoinClick = (e:React.MouseEvent)=>{
        // console.log("Join task");
        if(username === "admin7777" || currTaskGuestnames.includes(username)){
            postAddTaskGuest(localStorage.getItem('username') || username);
            return;
        }else if(username === task.hostName){
            alert("This is  your project!");
            return;
        } else {
            alert("You must join our team first!");
            return;
        }
        // postAddTaskGuest(localStorage.getItem('username') || username);
    }
    const postAddTaskGuest = async(guestname:string)=>{
        const token = localStorage.getItem('token');

        try{
            const res = await axios.post(`http://localhost:3000/api/v1/projects/${projectid}/tasks/${task._id}/guests`, {guestName : guestname},{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            // console.log("add project response message : ", res.data.message);
            setCurrTaskGuestnames(prev => [...prev, guestname]);
            setProjectSelected(prev => prev?{
                ...prev,
                tasks: prev.tasks.map(t => t._id === task._id ? {...t,  guestNames: currTaskGuestnames} : t)
            }: prev)
            fetchProjects();
        } catch(err){
            console.error(err);
        }
    }

    // create endDate & move to Done
    const handleDoneClick = (e:React.MouseEvent)=>{
        // console.log("Task finished");
        const user = localStorage.getItem('username') || username;
        if(user === task.hostName || user === projectSelected?.hostName || user === "admin7777"){
            updateTaskEndDate();
        }else{
            alert("You are not in this team!");
            return;
        }
    }
    const updateTaskEndDate = async ()=>{
        const token = localStorage.getItem('token');
        const enddate = {endDate : new Date()}
        const endDateJson = JSON.stringify(enddate);
        
        try{
            const res = await axios.post(`http://localhost:3000/api/v1/projects/${projectid}/tasks/${task._id}`, endDateJson,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            // console.log("finish task response message : ", res.data.message);
            // console.log(res.data);
            setProjectSelected(res.data.project);
            fetchProjects();
        } catch (err){
            console.error(err);
        }
    }

    // delete a task guest
    const handleDeleteClick = (e:React.MouseEvent)=>{
        console.log("delete task");
        const user = localStorage.getItem('username') || username;
        if(user === "admin7777" || user === projectSelected?.hostName || user === task.hostName){
            deleteTask();
        }else{
            alert("This is not your task!");
            return;
        }
        
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
            // console.log("delete task response message : ", res.data.message);
            // console.log(res.data);
            setProjectSelected(res.data.project);
            fetchProjects();
        } catch(err){
            console.error(err);
        }
    }

    return (
        <li className='flex flex-col justify-between border gap-x-2 px-5 py-2 w-full rounded-md' role="listitem" aria-labelledby={`task-${task._id}`}>
            <div className='flex flex-col gap-y-2'>
                <p className='font-bold'>Name : {task.title}</p>
                <p>Host : {task.hostName}</p>
                <p>Target date : {task.targetDate.toString().slice(0, 10)}</p>
                <p>{currTaskGuestnames.length} teammates</p>
            </div>
            {(title === "Doing") && <div className='flex gap-y-2 justify-between py-2'>
                            <button onClick={handleJoinClick} className='join_btn bg-green-100 p-1 w-14 h-max rounded' aria-label={`Join ${task.title}`}>Join</button>
                            <button onClick={handleDoneClick} className='done_btn bg-blue-100 p-1 w-14 h-max rounded' aria-label={`Mark ${task.title} as done`}>Done</button>
                            <button onClick={handleDeleteClick} className='delete_btn bg-red-100 p-1 w-14 h-max rounded' aria-label={`Delete ${task.title}`}>Delete</button>
                        </div>
            }
            {(title === "Done") && <div className='flex justify-center items-center'>
                            <button onClick={handleDeleteClick} className='delete_btn bg-red-100 p-1 w-14 h-max rounded' aria-label={`Delete ${task.title}`}>Delete</button>
                        </div>
            }
        </li>
    );
}