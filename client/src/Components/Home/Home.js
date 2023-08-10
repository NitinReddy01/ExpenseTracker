import React from 'react'
import './home.css';
import Navbar from '../Navbar/Navbar';
import Animation from '../Animation/Animation';
import Dashboard from '../Dashboard/Dashboard';


export default function Home() {

  return (
    <>
        <div className='home'>
          <Animation />
          <div className='mainlayout'>
            <Navbar />
            <main>
              <Dashboard />
            </main>
          </div>
        </div>
    </>
  )
}
