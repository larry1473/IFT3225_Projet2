import React, {useState} from 'react';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

export default function Connection() {
    const [isLogin, setIsLogin] = useState(true);
    const [isSignup, setIsSignup] = useState(false);

    const handleSignupClick = ():void =>{
        setIsLogin(false);
        setIsSignup(true);
    }

    const handleSignupCancelClick = ():void =>{
        setIsLogin(true);
        setIsSignup(false);
    }

    return (
        <div className='flex justify-center pt-24 h-lvh'>
            {isLogin && <Login onSignupClick={handleSignupClick}/>}
            {isSignup && <SignUp onSignupCancelClick={handleSignupCancelClick}/>}
        </div>
    );
}