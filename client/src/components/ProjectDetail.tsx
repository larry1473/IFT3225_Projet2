import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TaskSpace from './TaskSpace';
import TaskList from './UserList';
import UserList from './UserList';

type UserNameType = {
    username: string;
}

const teamUsers:UserNameType[] = [
    {username: "teammate1"},
    {username: "teammate2"},
    {username: "teammate3"},
    {username: "teammate4"},
    {username: "teammate5"},
    {username: "teammate6"},
    {username: "teammate7"},
    {username: "teammate8"},
    {username: "teammate9"},
    {username: "teammate10"},
    {username: "teammate11"},
    {username: "teammate12"},
    {username: "teammate13"},
    {username: "teammate14"},
    {username: "teammate15"},
    {username: "teammate16"},
    {username: "teammate17"},
    {username: "teammate18"},
    {username: "teammate19"},
    {username: "teammate20"},
]

const requestUsers:UserNameType[] = [
    {username: "user1"},
    {username: "user2"},
    {username: "user3"},
    {username: "user4"},
    {username: "user5"},
    {username: "user6"},
    {username: "user7"},
    {username: "user8"},
    {username: "user9"},
    {username: "user10"},
    {username: "user11"},
    {username: "user12"},
    {username: "user13"},
    {username: "user14"},
    {username: "user15"},
    {username: "user16"},
    {username: "user17"},
    {username: "user18"},
    {username: "user19"},
    {username: "user20"},
]

export default function ProjectDetail() {
    const {taskid} = useParams();
    console.log(taskid);

    const [teammates, setTeammates] = useState(teamUsers);
    const [joinRequests, setJoinRequests] = useState(requestUsers);

    const handleTeammatesAdd = (newTeammate:UserNameType)=>{
        console.log("team add");
        setTeammates([...teammates, newTeammate]);
        console.log(teammates);
        
        // update server
    }
    const handleTeammatesDelete = (newTeammate:UserNameType)=>{
        console.log("team delete");
        setTeammates(prev => prev.filter(t => t.username !== newTeammate.username));
        console.log(teammates);
        
        // update server
    }
    const handleRequestsAdd = (newRequester:UserNameType)=>{
        console.log("request add");
        const requestExists = joinRequests.some(req => req.username === newRequester.username)
        const teammateExists = joinRequests.some(req => req.username === newRequester.username)
        
        if (!requestExists && !teammateExists){
            setJoinRequests([...joinRequests, newRequester]);
        } else if(requestExists || teammateExists){
            alert("you are already on the list");
        }
        
        console.log(joinRequests);
        
        // update server
    }
    const handleRequestsDelete = (newRequester:UserNameType)=>{
        console.log("request delete");
        setJoinRequests(prev => prev.filter(t => t.username !== newRequester.username));
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

