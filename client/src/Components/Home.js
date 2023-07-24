import React from 'react'
import useAuth from '../Hooks/useAuth';
// import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../Hooks/useAxiosPrivate';

export default function Home() {
    const {user}=useAuth();
    // const navigate=useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const handleClick= async ()=>{
        // navigate('/test');
        let res=await axiosPrivate.get('/');
        console.log(res);
    }
  return (
    <div>
      Home
      <h1>{user.uname}</h1>
      <button onClick={handleClick} >click</button>
    </div>
  )
}