import React, { useEffect } from 'react'
import './home.css';
import Navbar from '../Navbar/Navbar';
import Animation from '../Animation/Animation';
import Dashboard from '../Dashboard/Dashboard';
import { Route,Routes, useLocation, useNavigate } from 'react-router-dom';
import Incomes from '../Incomes/Incomes';
import Expenses from '../Expenses/Expenses';


export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(()=>{
    const paths=["/","/incomes","/expenses"];
    if(!paths.includes(location.pathname)){
      navigate('/error');
    }
  },[location,navigate])
  return (
    <>
        <div className='home'>
          <Animation />
          <div className='mainlayout'>
            <Navbar />
            <main>
              <Routes>
                <Route path='/' element={<Dashboard/>}/>
                <Route path='/incomes' element={<Incomes/>} />
                <Route path='/expenses' element={<Expenses/>} />
              </Routes>
            </main>
          </div>
        </div>
    </>
  )
}
