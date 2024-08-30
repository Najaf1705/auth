import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {handleError,handleSuccess, handleWarning} from '../utils';
// import { toast } from 'react-toastify';


function Login() {
    const navigate=useNavigate();
    const [loginInfo,setLoginInfo]=useState({
        email:"",
        password:"",
    });

    const gotoHome=()=>{
        setTimeout(()=>{
            navigate('/home');
        },2000);
    }

    const handleChange=(e)=>{
        e.preventDefault()
        const {name,value}=e.target;
        // console.log(name,value);
        const copyLoginInfo={...loginInfo};
        copyLoginInfo[name]=value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin=async (e)=>{
        e.preventDefault();
        const {email,password}=loginInfo;
        if(!email || !password){
            return handleWarning("All fields are required");
        }
        try {
            const url="https://auth-api-steel.vercel.app/auth/login";
            const response=await fetch(url,{
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginInfo)
            });
            const result=await response.json();
            const{name,jwtToken}=result;
            if(response.status===403){
                handleError(result.message);
            }
            else if(response.status===400){
                handleWarning(result.error[0].message);
            }
            else if(response.status===200){
                handleSuccess(result.message);
                // console.log(jwtToken);
                localStorage.setItem('token',jwtToken);
                localStorage.setItem('loggedinUserName',name);
                gotoHome();
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
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <div>
                <label htmlFor='email'>Email</label>
                <input
                    onChange={handleChange}
                    type='email'
                    name='email'
                    placeholder='Enter email'
                    value={loginInfo.email}
                    />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input
                    onChange={handleChange}
                    type='password'
                    name='password'
                    placeholder='Enter password'
                    value={loginInfo.password}
                />
            </div>
            <button type='submit'>Login</button>
            <span>
                <Link to='/signup'>Don't have an account</Link>
            </span>
        </form>
    </div>
  )
}

export default Login
