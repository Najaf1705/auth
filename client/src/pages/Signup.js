import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'

function Signup() {
    const [signupInfo,setSignupInfo]=useState({
        name:"",
        email:"",
        password:"",
    });

    const handleChange=(e)=>{
        const {name,value}=e.target;
        console.log(name,value);
        const copySignupInfo={...signupInfo};
        copySignupInfo[name]=value;
        setSignupInfo(copySignupInfo);
    }

    const handleSignup=(e)=>{
        e.preventDefault();
        const {name,email,password}=signupInfo;
        if(!name||!email||!password){
            console.log("Fuck you bastard");
        }
    }

  return (
    <div className='container'>
        <h1>Login</h1>
        <form onSubmit={handleSignup}>
            <div>
                <label htmlFor='name'>Name</label>
                <input
                    onChange={handleChange}
                    type='text'
                    name='name'
                    autoFocus
                    placeholder='Enter name'
                    value={signupInfo.name}
                    />
            </div>
            <div>
                <label htmlFor='email'>Email</label>
                <input
                    onChange={handleChange}
                    type='email'
                    name='email'
                    placeholder='Enter email'
                    value={signupInfo.email}
                    />
            </div>
            <div>
                <label htmlFor='pass'>Password</label>
                <input
                    onChange={handleChange}
                    type='password'
                    name='pass'
                    placeholder='Enter password'
                    value={signupInfo.password}
                />
            </div>
            <button type='submit'>Signup</button>
            <span>
                <Link to='/login'>Already have an account</Link>
            </span>
        </form>
        <ToastContainer/>
    </div>
  )
}

export default Signup