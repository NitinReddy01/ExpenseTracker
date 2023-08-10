import './App.css';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import RequireAuth from './Components/Auth/RequireAuth';

function App() {
  return (
    <>
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route element={<RequireAuth/>}>
          <Route path='/' element={<Home/>} />
      </Route>
    </Routes>
    </>
  );
}

export default App;