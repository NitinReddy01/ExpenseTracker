import React from 'react'
import useAuth from '../Hooks/useAuth'
import { useLocation,Outlet,Navigate } from 'react-router-dom';

export default function RequireAuth() {
    const {user} = useAuth();
    const location = useLocation();
    return (
        user?.uname?<Outlet/>:<Navigate to='login' state={{from:location}} replace={true} />
    )
}