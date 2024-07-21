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

    const handleTeammatesAdd = (newTeammateName:string)=>{
        console.log("team add");

        setTeammates([...teammates, newTeammateName]);
        console.log(teammates);

        setProjectSelected(prev => prev ? {
            ...prev,
            guestNames: teammates
        } : prev);

        // update server
        if(projectSelected){
            console.log("adding teammate...");
            
            postAddTeammate(newTeammateName);
        }
    }
    const postAddTeammate = async (guestName : string )=>{
        const token = localStorage.getItem('token');
        
        try {
            const res = await axios.post(`http://localhost:3000/api/v1/projects/${projectid}/guests/`, 
                {guestName}, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log("Teammate added successfully");
            fetchProjects();
        } catch (error) {
            console.error("Failed to add teammate:", error);
        }
    }

    const handleTeammatesDelete = (teammateName:string)=>{
        console.log("team delete");
        if(teammates)
            setTeammates(prev => prev.filter(teammateName => teammateName !== teammateName));
        console.log(teammates);

        setProjectSelected(prev => prev ? {
            ...prev,
            guestNames: teammates
        } : prev);
        
        // update server
        if(projectSelected){
            console.log("delete teammate...");
            
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
            console.log("Teammate deleted successfully");
            fetchProjects();
        } catch (error) {
            console.error("Failed to add teammate:", error);
        }
    }
    const handleRequestsAdd = (newRequesterName:string)=>{
        console.log("request add");
        const requestExists = joinRequests.some(reqName => reqName === newRequesterName)
        const teammateExists = joinRequests.some(reqName => reqName === newRequesterName)
        if(requestExists || teammateExists){
            alert("you are already on the list");
            return;
        } else if (!requestExists && !teammateExists){
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


    const handleRequestsDelete = (newRequesterName:string)=>{
        console.log("request delete");
        setJoinRequests(prev => prev.filter(reqName => reqName !== newRequesterName));
        console.log(joinRequests);
        
        // update server
    }
    
    

    // add fetch data for teammates and joinRequests
    
    return (
        <div className='grid grid-cols-4 gap-y-4'>
            <div className='col-span-1'>
                <UserList 
                    title="Teammates" 
                    isTeam={true} 
                    isRequest={false}
                    userlist={teammates}
                    onTeammatesAdd={handleTeammatesAdd}
                    onTeammatesDelete={handleTeammatesDelete}
                    onRequetsAdd={handleRequestsAdd}
                    onRequetsDelete={handleRequestsDelete}
                />
                <UserList 
                    title="Join Requests" 
                    isTeam={false}
                    isRequest={true} 
                    userlist={joinRequests}
                    onTeammatesAdd={handleTeammatesAdd}
                    onTeammatesDelete={handleTeammatesDelete}
                    onRequetsAdd={handleRequestsAdd}
                    onRequetsDelete={handleRequestsDelete}
                />
            </div>
            <div className='col-span-3'>
                <TaskSpace />
            </div>
        </div>
    );
}

