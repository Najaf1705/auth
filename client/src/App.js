import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigate to='/login'/>}/>  
        <Route path='/login' element={<Login/>}/>  
        <Route path='/signup' element={<Signup/>}/>  
        <Route path='/home' element={<Home/>}/>  
      </Routes>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
