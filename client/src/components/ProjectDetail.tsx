import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TaskSpace from './TaskSpace';
import UserList from './UserList';
import { useProjects } from '../context/ProjectsContext';
import { ProjectType, ProjectAddType } from '../types/TaskMasterTypes';
import axios from 'axios';

export default function ProjectDetail() {
    const {projectid} = useParams();
    console.log(projectid);
    const {projectSelected, setProjectSelected, fetchProjects} = useProjects();
    const [teammates, setTeammates] = useState<string[]>(projectSelected?.guestNames || []);
    const [joinRequests, setJoinRequests] = useState<string[]>(projectSelected?.requestJoin || []);

    useEffect(()=>{
        fetchProjects();
    }, [])

    const handleTeammatesAdd = (newTeammateName:string)=>{
        // console.log("team add");

        if(teammates.includes(newTeammateName)){
            alert("You are already on the list");
            return;
        }


        // update server
        if(projectSelected){
            // console.log("adding teammate...");
            setTeammates([...teammates, newTeammateName]);
            
            postAddTeammateAndDeleteRequest(newTeammateName);
            setProjectSelected(prev => prev ? {
                ...prev,
                guestNames: teammates
            } : prev);
            setJoinRequests(joinRequests.filter(r => r !== newTeammateName));
        }
    }
    const postAddTeammateAndDeleteRequest = async (guestName : string )=>{
        const token = localStorage.getItem('token');    
        
        try {
            const addRes = await axios.post(`http://localhost:3000/api/v1/projects/${projectid}/guests/`,
                { guestName },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log("Add teammate : ", addRes.data);

            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
            await delay(1000);
            
            const deleteRes = await axios.delete(`http://localhost:3000/api/v1/projects/${projectid}/requesters/${guestName}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            console.log("Delete requester : ", deleteRes.data);
              

            fetchProjects();
        } catch (error) {
            console.error("Failed to add teammate:", error);
        }
    }

    const handleTeammatesDelete = (teammateName:string)=>{
        // console.log("team delete");
        if(teammates)
            setTeammates(prev => prev.filter(teammateName => teammateName !== teammateName));

        setProjectSelected(prev => prev ? {
            ...prev,
            guestNames: teammates
        } : prev);
        
        // update server
        if(projectSelected){
            // console.log("delete teammate...");
            
            postDeleteTeammate(teammateName);
        }
    }
    const postDeleteTeammate = async (guestName : string )=>{
        const token = localStorage.getItem('token');
        
        try {
            const res = await axios.delete(`http://localhost:3000/api/v1/projects/${projectid}/guests/${guestName}`, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log("Delete teammate : ", res.data.message);
            fetchProjects();
        } catch (error) {
            console.error("Failed to add teammate:", error);
        }
    }

    const handleRequestsAdd = (newRequesterName:string)=>{
        // console.log("request add");
        if(joinRequests.includes(newRequesterName) || teammates.includes(newRequesterName)){
            alert("You are already on the list");
            return;
        }

        setJoinRequests([...joinRequests, newRequesterName]);
        setProjectSelected(prev => prev ? {
            ...prev,
            guestNames: teammates
        } : prev);

        if(projectSelected){
            console.log("adding join request...");
            // update server
            postAddRequest(newRequesterName);
        }
    }
    const postAddRequest = async (requesterName : string )=>{
        const token = localStorage.getItem('token');
        
        try {
            const res = await axios.post(`http://localhost:3000/api/v1/projects/${projectid}/requesters/`, 
                {requesterName}, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log("Requester added successfully");
            fetchProjects();
        } catch (error) {
            console.error("Failed to add teammate:", error);
        }
    }


    const handleRequestsDelete = (requesterName:string)=>{
        // console.log("request delete");
        setJoinRequests(prev => prev.filter(reqName => reqName !== requesterName));
        
        setProjectSelected(prev => prev ? {
            ...prev,
            guestNames: teammates
        } : prev);
        
        // update server
        if(projectSelected){
            // console.log("delete teammate...");
            
            postDeleteRequester(requesterName);
        }
    }
    
    const postDeleteRequester = async (requesterName : string )=>{
        const token = localStorage.getItem('token');
        
        try {
            const res = await axios.delete(`http://localhost:3000/api/v1/projects/${projectid}/requesters/${requesterName}`, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log("Delete request : ", res.data.message);
            fetchProjects();
        } catch (error) {
            console.error("Failed to add teammate:", error);
        }
    }
    
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4'>
            <div className='col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-1'>
                <UserList 
                    title="Teammates" 
                    isTeam={true} 
                    isRequest={false}
                    userlist={teammates}
                    onTeammatesAdd={handleTeammatesAdd}
                    onTeammatesDelete={handleTeammatesDelete}
                    onRequestAdd={handleRequestsAdd}
                    onRequestDelete={handleRequestsDelete}
                />
                <UserList 
                    title="Join Requests" 
                    isTeam={false}
                    isRequest={true} 
                    userlist={joinRequests}
                    onTeammatesAdd={handleTeammatesAdd}
                    onTeammatesDelete={handleTeammatesDelete}
                    onRequestAdd={handleRequestsAdd}
                    onRequestDelete={handleRequestsDelete}
                />
            </div>
            <div className='col-span-1 sm:col-span-2 md:col-span-3'>
                <TaskSpace />
            </div>
        </div>
    );
}

