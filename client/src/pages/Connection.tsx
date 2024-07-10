import React, {useState} from 'react';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

export default function Connection() {
    const [isLogin, setIsLogin] = useState(true);
    const [isSignup, setIsSignup] = useState(false);

    return (
        <div>
            {isLogin && <Login />}
            {isSignup && <SignUp />}
        </div>
    );
}