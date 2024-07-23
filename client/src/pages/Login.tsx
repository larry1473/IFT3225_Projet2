import React, {useState, useEffect, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLoginStatus } from '../context/LoginStatusContext';

type LoginProps = {
    onSignupClick: ()=> void;
}

export default function Login() {
    const navigate = useNavigate();
    const {username, setHasLogedin, setUserLogedIn, setUsername} = useLoginStatus();
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const fetchLoginData = async () => {
        try {
            const res = await axios.post('http://localhost:3000/api/v1/signin', loginData);
            if(res.status === 200){
                const {token, userName} = res.data;
                console.log(res.data);
                localStorage.setItem('token', token);
                localStorage.setItem('username', userName);
                setUsername(userName);
                setUserLogedIn(loginData.email);
                setHasLogedin(true);
                console.log("Log in successful");
                navigate('/');
            } else {
                console.log("Log in failed");
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleLoginSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(loginData);
        console.log("Login");
        fetchLoginData();
    }

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const { name, value } = e.target;
        setLoginData(prev =>({
            ...prev,
            [name] : value
        }));
    }

    const handleSignupClick = ()=>{
        navigate('../connection/signup');
    }

    return (
        <div className='flex justify-center items-start py-24 h-lvh'>
            <div className='login_form flex flex-col items-center justify-center gap-3 border px-20 py-2 h-max'>
                <h1 className='text-xl'>LOG IN</h1>
                <form onSubmit={handleLoginSubmit} className='flex flex-col gap-3'>
                    <div className='flex flex-col'>
                        <label htmlFor="email">Email</label>
                        <input id='email' name='email' onChange={handleInputChange} type="text" placeholder='Type your email' className='border p-1 w-60'/>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password">Password</label>
                        <input id='password' name='password' onChange={handleInputChange} type="password" placeholder='Type your password' className='border p-1 w-60'/>
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