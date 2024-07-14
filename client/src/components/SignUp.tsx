import React from 'react';

export default function SignUp() {
    const handleSignupClick = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
    }
    return (
        <div className='login_form flex flex-col items-center justify-center gap-3 border px-20 py-10 h-full'>
            <h1 className='text-xl'>CREATE NEW ACCOUNT</h1>
            <form className='flex flex-col gap-3'>
                <div className='flex flex-col'>
                    <label htmlFor="">First name</label>
                    <input type="text" placeholder='Type your first name' className='border p-1 w-60'/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="">Last name</label>
                    <input type="text" placeholder='Type your last name' className='border p-1 w-60'/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="">Email</label>
                    <input type="text" placeholder='Type your email' className='border p-1 w-60'/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="">Password</label>
                    <input type="password" placeholder='Type your password' className='border p-1 w-60'/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="">Confirm password</label>
                    <input type="password" placeholder='Type your password' className='border p-1 w-60'/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="">Telephone</label>
                    <input type="tel" placeholder='Type your phone number' className='border p-1 w-60'/>
                </div>

                <div className='flex justify-between'>
                    <button onClick={handleSignupClick} className='border rounded-full p-1 my-6 px-3 py-1 w-24'>CANCEL</button>
                    <button onClick={handleSignupClick} className='border rounded-full p-1 my-6 px-3 py-1 w-24'>SIGN UP</button>
                </div>
            </form>
        </div>
    );
}

