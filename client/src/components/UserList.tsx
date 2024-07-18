import React, { useEffect, useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import { CiSearch } from "react-icons/ci";

type UserNameType = {
    username: string;
}

const userNames:UserNameType[] = [
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
    const [users, setUsers] = useState(userlist);

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

    return (
        <div className='tasklist w-full h-lvh px-5 py-4 my-4 border-t'>
            <h3 className='text-center'>{title}</h3>
            <div className='flex justify-center items-center gap-x-1 w-full'>
                <input className='w-36 my-2' type="text" placeholder='Search by name'/>
                <button className='border rounded-full p-1'><CiSearch /></button>
            </div>
            <ul className='userlist flex flex-col gap-y-2 items-start w-full'>
                {users.map(user => (
                    <div key={uuidv4()} className='userlist_items flex justify-between items-center w-44 border p-2'>
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

