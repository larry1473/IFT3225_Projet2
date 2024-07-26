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
        if(projectSelected?.hostName !== username){
            alert("You can't accept this request!");
            return;
        }
        e.preventDefault();

        const userSelectedName = e.currentTarget.name;
        onTeammatesAdd(userSelectedName);
    }
    const handleXClick = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();

        console.log(e.currentTarget.name);
        const userSelectedName = e.currentTarget.name;
        
        if(isTeam){
            if(projectSelected?.hostName !== username){
                alert("You can't delete a teammate!");
                return;
            }
            onTeammatesDelete(userSelectedName);
        }
        else if(isRequest){
            onRequestDelete(userSelectedName);
        }
    }
    const handleAddRequestClick = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const myName = localStorage.getItem('username') || username;
        if(projectSelected?.hostName === myName){
            alert("This is your project!");
            return;
        } else{
            onRequestAdd(myName);
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
        <div className='tasklist col-span-1 w-full h-lvh row-span-1 flex flex-col gap-y-3 px-5 py-4 border-r border-t'>
            <div className='row-span-1 flex flex-col items-center gap-y-2'>
                <h3 className='text-center'>{title}</h3>
                {isRequest && <button onClick={handleAddRequestClick} type='submit' className='text-center border px-2 py-1'>Add my request</button>}
                <form onSubmit={handleFilterSubmit} className='flex justify-center items-center gap-x-1 w-full'>
                    <input onChange={handleFilterChange} className='w-32 my-2' type="text" placeholder='Search by name'/>
                    <button className='border rounded-full p-1'><CiSearch /></button>
                </form>
            </div>
            <ul className='userlist row-span-3 flex flex-col gap-y-2 items-center w-full border p-2'>
                {users.map(username => (
                    <div key={uuidv4()} className='userlist_items flex flex-col justify-between items-center lg:flex-row w-min border p-2'>
                        <li className='px-2'>{username}</li>
                        <div className='flex gap-x-1'>
                            {!isTeam && <button onClick={handleOClick} type='submit' name={username} className='request_okbtn border text-center bg-green-300 w-7 rounded-full'>O</button>}
                            <button onClick={handleXClick} type='submit' name={username} className='request_xbtn border bg-red-300 w-7 rounded-full'>X</button>
                        </div>
                    </div> 
                ))}
            </ul>
        </div>
    );
}

