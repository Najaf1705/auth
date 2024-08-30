import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {handleError,handleSuccess, handleWarning} from '../utils';
// import { toast } from 'react-toastify';


function Signup() {
    const navigate=useNavigate();
    const [signupInfo,setSignupInfo]=useState({
        name:"",
        email:"",
        password:"",
    });

    const gotoLogin=()=>{
        setTimeout(()=>{
            navigate('/login');
        },2000);
    }

    const handleChange=(e)=>{
        e.preventDefault()
        const {name,value}=e.target;
        // console.log(name,value);
        const copySignupInfo={...signupInfo};
        copySignupInfo[name]=value;
        setSignupInfo(copySignupInfo);
    }

    const handleSignup=async (e)=>{
        e.preventDefault();
        const {name,email,password}=signupInfo;
        if(!name || !email || !password){
            return handleWarning("All fields are required");
        }
        try {
            const url="https://auth-api-steel.vercel.app/auth/signup";
            const response=await fetch(url,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupInfo)
            });
            const result=await response.json();
            if(response.status===409){
                handleWarning(result.message);
                gotoLogin();
            }
            else if(response.status===400){
                handleWarning(result.error[0].message);
            }
            else if(response.status===201){
                handleSuccess(result.message);
                gotoLogin();
            }
            else{
                handleError(result.message);
            }
        } catch (error) {
            handleError(error);
        }
    }

  return (
    <div className='container'>
        <h1>Signup</h1>
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
                <label htmlFor='password'>Password</label>
                <input
                    onChange={handleChange}
                    type='password'
                    name='password'
                    placeholder='Enter password'
                    value={signupInfo.password}
                />
            </div>
            <button type='submit'>Signup</button>
            <span>
                <Link to='/login'>Already have an account</Link>
            </span>
        </form>
    </div>
  )
}

export default Signup
