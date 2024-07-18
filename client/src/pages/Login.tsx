import React, {useState, useEffect, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLoginStatus } from '../context/LoginStatusContext';

type LoginProps = {
    onSignupClick: ()=> void;
}

export default function Login() {
    const navigate = useNavigate();
    const {hasLogedin, setHasLogedin} = useLoginStatus();
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const fetchLoginData = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/signin', loginData);
            console.log('Data from server:', response.data);
            console.log("Log in success");
            setHasLogedin(true);
            navigate('/');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    //     fetch('http://localhost:3000/api/v1/signin', {
    //         method: 'POST',
    //         headers: {
    //             'Content-type': 'application/json',
    //         },
    //         body: JSON.stringify(loginData),
    //     })
    //     .then((res) => {
    //         if(!res.ok){
    //             throw new Error("Network response was not ok");
    //         }
    //         return res.json();
    //     })
    //     .then((data) => {
    //         console.log(data);
    //     })
    //     .catch((error) => console.error("Error fetching data: ", error));
    // };

    const handleLoginSubmit = (e:React.SyntheticEvent)=>{
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
        <div className='flex justify-center py-24 h-full'>
            <div className='login_form flex flex-col items-center justify-center gap-3 border px-20 py-10 h-5/6'>
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