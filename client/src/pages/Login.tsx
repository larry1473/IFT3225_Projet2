import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

type LoginProps = {
    onSignupClick: ()=> void;
}

export default function Login() {
    const navigate = useNavigate();

    const handleLoginSubmit = (e:React.SyntheticEvent)=>{
        e.preventDefault();
        console.log("Login");
    }

    const handleSignupClick = ()=>{
        navigate('../connection/signup');
    }

    return (
        <div className='flex justify-center py-24 h-full'>
            <div className='login_form flex flex-col items-center justify-center gap-3 border px-20 py-10 h-5/6'>
                <h1 className='text-xl'>LOG IN</h1>
                <form onSubmit={handleLoginSubmit} className='flex flex-col gap-3'>
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
                    <button onClick={handleSignupClick} className='border text-center rounded-full p-1 my-6'>SIGN UP</button>
                </form>
            </div>
        </div>
    );
}