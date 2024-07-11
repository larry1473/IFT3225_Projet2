import React, {useState} from 'react';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

export default function Connection() {
    const [isLogin, setIsLogin] = useState(true);
    const [isSignup, setIsSignup] = useState(false);

    return (
        <div className='flex justify-center pt-24 h-lvh'>
            {isLogin && <Login />}
            {isSignup && <SignUp />}
        </div>
    );
}