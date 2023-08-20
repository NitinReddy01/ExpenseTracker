import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import RequireAuth from './Components/Auth/RequireAuth';
import ErrorPage from './Components/ErrorPage';
import PersistLogin from './Components/Auth/PersistLogin';

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<PersistLogin />} >
          <Route element={<RequireAuth />}>
            <Route path='/*' element={<Home />} />
            <Route path='/error' element={<ErrorPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;