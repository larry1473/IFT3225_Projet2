import React, { useEffect, useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import { CiSearch } from "react-icons/ci";
import { useLoginStatus } from '../context/LoginStatusContext';

type UserNameType = {
    username: string;
}

type UserListType = {
    title: string;
    isTeam: boolean;
    isRequest: boolean;
    userlist: UserNameType[];
    onTeammatesAdd: (user: UserNameType)=> void;
    onTeammatesDelete: (user: UserNameType)=> void;
    onRequetsAdd: (user: UserNameType)=> void;
    onRequetsDelete: (user: UserNameType)=> void;
}

export default function UserList({title, isTeam, isRequest, userlist, onTeammatesAdd, onTeammatesDelete, onRequetsAdd, onRequetsDelete}:UserListType) {
    const {userLogedIn} = useLoginStatus();
    const [users, setUsers] = useState(userlist);
    const [filter, setFilter] = useState("");
    const [isProjectHost, setIsProjectHost] = useState("false");

    useEffect(()=>{
        setUsers(userlist);
    }, [userlist]);

    const handleOClick = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();

        console.log(e.currentTarget.name);
        const userSelectedName = e.currentTarget.name;
        onRequetsDelete({username: userSelectedName});
        onTeammatesAdd({username: userSelectedName});
    }
    const handleXClick = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();

        console.log(e.currentTarget.name);
        const userSelectedName = e.currentTarget.name;
        if(isTeam){
            onTeammatesDelete({username: userSelectedName});
        }
        else if(isRequest){
            onRequetsDelete({username: userSelectedName});
        }
    }
    const handleAddRequestClick = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        onRequetsAdd({username: userLogedIn});
    }
    const handleFilterChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setFilter(e.target.value);
    }
    const handleFilterSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(filter !== ""){
            const filteredUsers = users.filter(userlist => userlist.username.includes(filter))
            setUsers(filteredUsers);
        } else {
            setUsers(userlist);
        }
    }

    return (
        <div className='tasklist w-full h-lvh row-span-1 flex flex-col gap-y-3 px-5 py-4 border-r border-t'>
            <div className='row-span-1 flex flex-col items-center gap-y-2'>
                <h3 className='text-center'>{title}</h3>
                {isRequest && <button onClick={handleAddRequestClick} type='submit' className='text-center border px-2 py-1'>Add my request</button>}
                <form onSubmit={handleFilterSubmit} className='flex justify-center items-center gap-x-1 w-full'>
                    <input onChange={handleFilterChange} className='w-32 my-2' type="text" placeholder='Search by name'/>
                    <button className='border rounded-full p-1'><CiSearch /></button>
                </form>
            </div>
            <ul className='userlist row-span-3 flex flex-col gap-y-2 items-start w-full border p-2'>
                {users.map(user => (
                    <div key={uuidv4()} className='userlist_items flex justify-between items-center w-40 border p-2'>
                        <li className='px-2'>{user.username}</li>
                        <div className='flex gap-x-1'>
                            {!isTeam && <button onClick={handleOClick} type='submit' name={user.username} className='request_okbtn border text-center bg-green-300 w-7 rounded-full'>O</button>}
                            <button onClick={handleXClick} type='submit' name={user.username} className='request_xbtn border bg-red-300 w-7 rounded-full'>X</button>
                        </div>
                    </div> 
                ))}
            </ul>
        </div>
    );
}

