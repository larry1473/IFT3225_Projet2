import React, { useEffect, useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import { CiSearch } from "react-icons/ci";
import { useLoginStatus } from '../context/LoginStatusContext';
import { useProjects } from '../context/ProjectsContext';

type UserListType = {
    title: string;
    isTeam: boolean;
    isRequest: boolean;
    userlist: string[];
    onTeammatesAdd: (user: string)=> void;
    onTeammatesDelete: (user: string)=> void;
    onRequestAdd: (user: string)=> void;
    onRequestDelete: (user: string)=> void;
}

export default function UserList({title, isTeam, isRequest, userlist, onTeammatesAdd, onTeammatesDelete, onRequestAdd, onRequestDelete}:UserListType) {
    const {username} = useLoginStatus();
    const {projectSelected} = useProjects()
    const [users, setUsers] = useState(userlist);
    const [filter, setFilter] = useState("");

    useEffect(()=>{
        setUsers(userlist);
    }, [userlist]);

    const handleOClick = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        if(projectSelected?.hostName === username || projectSelected?.hostName === "admin7777"){
            const userSelectedName = e.currentTarget.name;
            onTeammatesAdd(userSelectedName);
        } else {
            alert("You can't accept this request!");
            return;
        }
    }
    const handleXClick = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();

        console.log(e.currentTarget.name);
        const userSelectedName = e.currentTarget.name;
        
        if(isTeam){
            const user = localStorage.getItem('username') || username;
            if(user === "admin7777" || projectSelected?.hostName === user){
                onTeammatesDelete(userSelectedName);
            }else{
                alert("You can't delete a teammate!");
                return;
            }
            
        }
        else if(isRequest){
            onRequestDelete(userSelectedName);
        }
    }
    const handleAddRequestClick = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const myName = localStorage.getItem('username') || username;
        if(projectSelected?.hostName === myName || myName === "admin7777"){
            onRequestAdd(myName);
        }else{
            alert("This is your project!");
            return;
        } 
    }
    const handleFilterChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setFilter(e.target.value);
    }
    const handleFilterSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        
        if(filter !== ""){
            console.log(users);
            
            userlist.filter(username => console.log(username.includes(filter)))
            const filteredUsers = userlist.filter(username => username.includes(filter))
            console.log(filteredUsers);
            
            setUsers(filteredUsers);
            console.log(users);
            
        } else {
            setUsers(userlist);
        }
    }

    return (
        <div className='tasklist col-span-1 w-full h-lvh row-span-1 flex flex-col gap-y-3 px-5 py-4 border-r border-t' role="region" aria-labelledby="tasklist-heading">
            <div className='row-span-1 flex flex-col items-center gap-y-2'>
                <h3 className='text-center'>{title}</h3>
                {isRequest && <button onClick={handleAddRequestClick} type='submit' className='text-center border px-2 py-1' aria-label="Add my request">Add my request</button>}
                <form onSubmit={handleFilterSubmit} className='flex justify-center items-center gap-x-1 w-full' role="search" aria-labelledby="search-heading">
                    <input onChange={handleFilterChange} className='w-32 my-2' type="text" placeholder='Search by name' aria-label="Search by name"/>
                    <button className='border rounded-full p-1' aria-label="Search"><CiSearch /></button>
                </form>
            </div>
            <ul className='userlist row-span-3 flex flex-col gap-y-2 items-center w-full border p-2'>
                {users.map(username => (
                    <div key={uuidv4()} className='userlist_items flex flex-col justify-between items-center lg:flex-row w-min border p-2' aria-labelledby="userlist-heading">
                        <li className='px-2'>{username}</li>
                        <div className='flex gap-x-1'>
                            {!isTeam && <button onClick={handleOClick} type='submit' name={username} className='request_okbtn border text-center bg-green-300 w-7 rounded-full' aria-label={`Approve request from ${username}`}>O</button>}
                            <button onClick={handleXClick} type='submit' name={username} className='request_xbtn border bg-red-300 w-7 rounded-full' aria-label={`Reject request from ${username}`}>X</button>
                        </div>
                    </div> 
                ))}
            </ul>
        </div>
    );
}

