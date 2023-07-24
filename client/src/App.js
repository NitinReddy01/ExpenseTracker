import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import RequireAuth from './Components/RequireAuth';
import Test from './Components/Test';

function App() {
  return (
    <>
    {/* <Register/> */}
    {/* <Login/> */}
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route element={<RequireAuth/>}>
        <Route path='/' element={<Home/>} />
        <Route path='/test' element={<Test/>} />
      </Route>
    </Routes>
    </>
  );
}

export default App;