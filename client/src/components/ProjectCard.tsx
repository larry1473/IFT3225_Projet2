import React, { useState } from 'react';
import { useLoginStatus } from '../context/LoginStatusContext';
import { useNavigate } from 'react-router-dom';
import { ProjectType } from '../types/TaskMasterTypes';
import axios from 'axios';
import { useProjects } from '../context/ProjectsContext';

type ProjectCardPropsType = {
    onCardClick: (e:React.MouseEvent) => void;
    project:ProjectType;
}

export default function ProjectCard({onCardClick, project}:ProjectCardPropsType) {
    const {hasLogedin, username} = useLoginStatus();
    const {handleDeleteProjectClick, projectSelected, setProjectSelected} = useProjects();
    const navigate = useNavigate();

    const handleDetailClick = (e:React.MouseEvent)=>{
        console.log(e.target);
        
        if(!hasLogedin){
            navigate(`/connection/login`);
            return;
        } else {
            setProjectSelected(project);
            console.log(projectSelected);
            navigate(`../taskcards/${project._id}`);
        }
    }

    const handleDeleteClick = (e:React.MouseEvent)=>{
        if(!hasLogedin){
            navigate(`/connection/login`);
            return;
        }
        const myUsername = localStorage.getItem('username');
        console.log(username);
        
        
        if(myUsername !== project.hostName){
            alert("This is not your project !!");
            return;
        }

        handleDeleteProjectClick(project);
        postDeleteProject(project);
    }

    const postDeleteProject = async (project: ProjectType)=>{
        const token = localStorage.getItem('token');

        try{
            const res = await axios.delete(`http://localhost:3000/api/v1/projects/${project._id}`, {
                headers:{
                    'Authorization': `Bearer ${token}`,
                }
            });
            console.log("Delete project response message : ", res.data.message);
        } catch(err){
            console.error(err);
        }
    }

    return (
        <div className='taskcard flex flex-col items-start justify-between gap-2 border p-2 w-5/6 h-44 rounded-md'>
            <div className='flex flex-col'>
                <h3 className='font-bold pb-2'>{project.name}</h3>
                <p>{project.hostName}</p>
                <p>{project.description.length < 50 ? project.description : project.description.slice(0, 50) + "..."}</p>
            </div>
            <div className='flex justify-between w-full pt-3'>
                <button onClick={handleDeleteClick} className='bg-red-100 text-right text-sm font-semibold p-1 rounded'>Delete</button>
                <button onClick={handleDetailClick} className='bg-blue-100 text-right text-sm font-semibold p-1 rounded'>View detail</button>
            </div>
        </div>
    );
}

