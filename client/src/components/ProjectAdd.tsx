import React, { useState } from 'react';
import axios from 'axios';
import { useLoginStatus } from '../context/LoginStatusContext';
import { useNavigate } from 'react-router-dom';
import { ProjectType, ProjectAddType} from '../types/TaskMasterTypes';
import { useProjects } from '../context/ProjectsContext';


export default function ProjectAdd() {
    const {fetchProjects} = useProjects();
    const {hasLogedin, username} = useLoginStatus();
    const navigate = useNavigate();
    const [projectInfo, setProjectInfo] = useState({
        name: "",
        hostName: "",
        guestNames: [],
        description: "",
        createDate: new Date(),
        targetDate: new Date(),
        endDate: new Date(),
        requestJoin: [],
        tasks:[]
    });


    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setProjectInfo(prev=>({
            ...prev,
            [name]:value,
        }))
    };
    const handleTargetDateChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        console.log(name, " : ", value);
        
        const newTargetDate = new Date(value);

        if(newTargetDate < projectInfo.createDate){
            alert("Target date cannot be earlier than create date");
            return;
        }

        setProjectInfo(prev=>({
            ...prev,
            [name]:new Date(value),
        }))
    }

    const handleAddSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!hasLogedin){
            navigate(`/connection/login`);
        }
        
        postAddProject();
    };
    const postAddProject = async ()=>{
        console.log(projectInfo);
        const token = localStorage.getItem('token');

        console.log(username);
        console.log(localStorage.getItem('username'));
        
        setProjectInfo({
            ...projectInfo,
            hostName: "name3333",
            createDate: new Date(),
            endDate: new Date(),
        })

        const projectJson = JSON.stringify(projectInfo);
        console.log(projectJson);
        
        try{
            const res = await axios.post("http://localhost:3000/api/v1/projects", projectJson, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("add project response message : ", res.data.message);
            console.log("add project response username : ", res.data.userName);
            fetchProjects();
        } catch(err){
            console.error("Add project failed : ", err);
        }
    };

    return (
        <form onSubmit={handleAddSubmit} className='flex items-center gap-4 border px-5 py-4'>
            <div className='flex flex-col'>
                <label htmlFor="name">name</label>
                <input id='name' name="name" type="text" onChange={handleInputChange} placeholder='Type a project name'  className='projectadd_input p-1'/>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="description">description</label>
                <input id='description' name='description' type="text" onChange={handleInputChange} placeholder='Type a project description' className='projectadd_input p-1'/>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="targetDate">Target date</label>
                <input id='targetDate' name='targetDate' type="date" onChange={handleTargetDateChange} className='projectadd_input p-1'/>
            </div>
            <div className='flex'>
                <button type='submit' className='p-2 rounded-full border text-center'>Add project</button>
            </div>
        </form>
    );
}

