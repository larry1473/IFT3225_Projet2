import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';

type UserNameType = {
    username: string;
}

const userNames:UserNameType[] = [
    {username: "user1"},
    {username: "user2"},
    {username: "user3"},
    {username: "user4"},
    {username: "user5"},
    {username: "user1"},
    {username: "user2"},
    {username: "user3"},
    {username: "user4"},
    {username: "user5"},
    {username: "user1"},
    {username: "user2"},
    {username: "user3"},
    {username: "user4"},
    {username: "user5"},
    {username: "user1"},
    {username: "user2"},
    {username: "user3"},
    {username: "user4"},
    {username: "user5"},
]

export default function UserList() {
    const [users, setUsers] = useState(userNames);

    return (
        <div className='tasklist w-full h-lvh px-5 py-2'>
            <input type="text"/>
            <ul className='flex flex-col gap-y-2 items-start'>
                {users.map(user => (
                   <li key={uuidv4()} className='px-2'>{user.username}</li> 
                ))}
            </ul>
        </div>
    );
}

