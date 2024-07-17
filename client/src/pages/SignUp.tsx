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
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState<string>('');

    const query = useQuery({
        queryKey:['msg', message],
        queryFn: ()=>{
            console.log(message);
        }
    });

    console.log(query.data);
    

    const mut = useMutation({
        mutationFn: signUp,
        onSuccess: (data:userType) =>{
            console.log('User signed up: ', data);
            navigate('../connection/login');
        },
        onError: (err:Error) => {
            setError(err.message);
        }
    });

    const handleNameChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setName( e.target.value.trim() );
    }
    const handleEmailChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setName( e.target.value.trim() );
    }
    const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setName( e.target.value.trim() );
    }
    const handleSignupClick = async (e:React.SyntheticEvent)=>{
        e.preventDefault();
        console.log("sign up");
        if(name === ''){
            setError("name is required!");
        }
        if(email === ''){
            setError(prevMsg => prevMsg ? `${prevMsg} email is required!` : `email is required!`);
        }
        if(password === ''){
            setError(prevMsg => prevMsg ? `${prevMsg} password is required` : `password is required`);
        }

        // try {
        //     await mut.mutateAsync({ name, email, password });
        // } catch (err: any) {
        //     setError(err.message);
        // }
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
                    <label htmlFor="">Name</label>
                    <input onChange={handleNameChange} type="text" placeholder='Type your first name' className='border p-1 w-60'/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="">Email</label>
                    <input onChange={handleEmailChange} type="text" placeholder='Type your email' className='border p-1 w-60'/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="">Password</label>
                    <input onChange={handlePasswordChange} type="password" placeholder='Type your password' className='border p-1 w-60'/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="">Confirm password</label>
                    <input type="password" placeholder='Type your password' className='border p-1 w-60'/>
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

