import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import RefreshHandler from './RefreshHandler';
import { useState } from 'react';


function App() {
  const [isAuthenticated, setIsAuthenticated]=useState(false);

  const PrivateRoute=({element})=>{
    if(isAuthenticated)return element;
    return <Navigate to='/login' />
  }

  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path='/' element={<Navigate to='/login'/>}/>  
        <Route path='/login' element={<Login/>}/>  
        <Route path='/signup' element={<Signup/>}/>  
        <Route path='/home' element={<PrivateRoute element={<Home/>}/>}/>  
      </Routes>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
