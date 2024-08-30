import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';

function Home() {
  const navigate=useNavigate();
  const [loggedInUser,setLoggedInUser]=useState('');
  const [products,setProducts]=useState('');
  
  const handleLogout=(e)=>{
    localStorage.removeItem('loggedinUserName');
    localStorage.removeItem('token');
    setTimeout(()=>{
      navigate('/login');
      handleSuccess("Logged Out Succesfully");
    },1000)
  }
  
  const getProducts=async()=>{
    try {
      const url="https://auth-api-steel.vercel.app/products";
      const response=await fetch(url,{
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      if(response.status!==200){
        return handleError("Products cant be loaded");
      }
      const result=await response.json();
      setProducts(result);
      console.log(result);
    } catch (error) {
      handleError(error);
    }
  };
  
    useEffect(()=>{
      setLoggedInUser(localStorage.getItem('loggedinUserName'));
      getProducts();
    },[]);
  
  return (
    <>
      <div>{loggedInUser}</div>
      <button onClick={handleLogout} className='logoutBtn'>
        Logout
      </button>
      <div>
        {
          products && products.map((item,index)=>(
            <ul key={index}>
              <span>{item.name}: {item.price}</span>
            </ul>
          ))
        }
      </div>
    </>
  )
}

export default Home
