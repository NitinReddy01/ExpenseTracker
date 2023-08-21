import React, { useEffect, useMemo } from 'react'
import Navbar from './Navbar';
import Animation from './Animation';
import Dashboard from './Dashboard';
import { Route,Routes, useLocation, useNavigate } from 'react-router-dom';
import Incomes from './Incomes';
import Expenses from './Expenses';
import { MainLayout } from '../Styles/Layout';
import { styled } from 'styled-components';
import { SkeletonTheme } from 'react-loading-skeleton';


export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(()=>{
    const paths=["/","/incomes","/expenses"];
    if(!paths.includes(location.pathname)){
      navigate('/error');
    }
  },[location,navigate])

  const Memo=useMemo(()=>{
    return <Animation/>
  },[])

  return (
    <>
      <SkeletonTheme baseColor="#d1cfc9" highlightColor="#82817f">
        <HomeStyle>
          {Memo}
          <MainLayout>
            <Navbar />
            <main>
              <Routes>
                <Route path='/' element={<Dashboard/>}/>
                <Route path='/incomes' element={<Incomes/>} />
                <Route path='/expenses' element={<Expenses/>} />
              </Routes>
            </main>
          </MainLayout>
        </HomeStyle>
        </SkeletonTheme>
    </>
  )
}

const HomeStyle=styled.div`
  height: 100vh;
  background-image: url('../../utils/bg.png');
  position: relative;
  main{
    flex: 1;
    background: rgba(252,246,249,0.78);
    border: 3px solid #FFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
        width: 0;
    }
  }
`;
