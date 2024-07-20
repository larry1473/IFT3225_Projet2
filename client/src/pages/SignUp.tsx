import React, { useEffect, useState } from 'react';
import { useFetcher, useNavigate } from 'react-router-dom';
import { signUp } from '../apis/user-api';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

type SignUpPropsType = {
    onSignupCancelClick: ()=>void;
}

type signUpType = (userInfo : userType) => Promise<any>;

type userType = {
    name: string;
    email: string;
    password: string;
}

export default function SignUp() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [message, setMessage] = useState<string>('');
    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: ""
    });

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setSignupData(prev =>({
            ...prev,
            [name] : value.trim(),
        }))
    }
    const fetchSignupData = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/signup', signupData);
            console.log('Data from server:', response.data);
            console.log("Sign up success");
            navigate('../connection/login');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleSignupClick = async (e:React.SyntheticEvent)=>{
        e.preventDefault();
        console.log("sign up");
        if(signupData.name === ''){
            setError("name is required!");
        }
        if(signupData.email === ''){
            setError(prevMsg => prevMsg ? `${prevMsg} email is required!` : `email is required!`);
        }
        if(signupData.password === ''){
            setError(prevMsg => prevMsg ? `${prevMsg} password is required` : `password is required`);
        }
        if(signupData.confirm_password === ''){
            setError(prevMsg => prevMsg ? `${prevMsg} confirm password is required` : `confirm password is required`);
        }

        fetchSignupData();
    }
    const handleCancelClick = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        navigate('../connection/login');
    }
    return (
        <div className='flex justify-center py-24 h-full'>
        <div className='login_form flex flex-col items-center justify-center gap-3 border px-20 py-10 h-full'>
            <h1 className='text-xl'>CREATE NEW ACCOUNT</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSignupClick} className='flex flex-col gap-3'>
                <div className='flex flex-col'>
                    <label htmlFor="name">Username</label>
                    <input id='name' name='name' onChange={handleInputChange} type="text" placeholder='Type your username' className='border p-1 w-60'/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="email">Email</label>
                    <input id='email' name='email' onChange={handleInputChange} type="text" placeholder='Type your email' className='border p-1 w-60'/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password">Password</label>
                    <input id='password' name='password' onChange={handleInputChange} type="password" placeholder='Type your password' className='border p-1 w-60'/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="confirm_password">Confirm password</label>
                    <input id='confirm_password' name='confirm_password' onChange={handleInputChange} type="password" placeholder='Type your password' className='border p-1 w-60'/>
                </div>

                <div className='flex justify-between'>
                    <button onClick={handleCancelClick} className='border rounded-full p-1 my-6 px-3 py-1 w-24'>CANCEL</button>
                    <button className='border rounded-full p-1 my-6 px-3 py-1 w-24'>SIGN UP</button>
                </div>
            </form>
        </div>
        </div>
    );
}

