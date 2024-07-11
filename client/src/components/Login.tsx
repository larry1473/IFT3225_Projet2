import React from 'react';
import { Link } from 'react-router-dom';

interface LoginProps{
    onSignupClick: ()=> void;
}

export default function Login({onSignupClick}:LoginProps) {
    return (
        <div className='login_form flex flex-col items-center justify-center gap-3 border px-20 py-10 h-4/6'>
            <h1 className='text-xl'>LOG IN</h1>
            <form className='flex flex-col gap-3'>
                <div className='flex flex-col'>
                    <label htmlFor="">Email</label>
                    <input type="text" placeholder='Type your email' className='border p-1 w-60'/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="">Password</label>
                    <input type="password" placeholder='Type your password' className='border p-1 w-60'/>
                </div>
                <button className='border rounded-full p-1 my-5'>LOGIN</button>
                <small className='text-center'><a href="">forgot email or password?</a></small>

                <small className='text-center'>Or create new account?</small>
                <button onClick={onSignupClick} className='border text-center rounded-full p-1 my-6'>SIGN UP</button>
            </form>
        </div>
    );
}