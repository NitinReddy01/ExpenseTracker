import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import { signout } from '../../utils/icons';
import './navbar.css';
import { dashboard, expenses, transactions, trend } from '../../utils/icons';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';

export default function Navbar() {
    const { user,setUser } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate= useNavigate();
    const [menu, setMenu] = useState([
        {
            id: 1, title: 'Dashboard', icon: dashboard, link: '/', active: false
        },
        {
            id: 2, title: "View Transactions", icon: transactions, link: "/", active: false
        },
        {
            id: 3, title: "Incomes", icon: trend, link: "/incomes", active: false
        },
        {
            id: 4, title: "Expenses", icon: expenses, link: "/expenses", active: false
        },
    ])

    const handleClick = (id) => {
        // console.log("click", id);
        // console.log(menu);
        setMenu((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, active: !item.active } : item
            )
        );
        // console.log(menu);
    };

    const logOut = async ()=>{
        try{
            const res=await axiosPrivate.get('auth/logout');
            console.log(res);
            setUser({});
            navigate('/login');
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className='navb'>
            <div className='user-con'>
                <div className='text'>
                    <h2>{user?.uname}</h2>
                    <p>Your Money</p>
                </div>
            </div>
            <ul className='items'>
                {menu.map((item) => {
                    return <li
                        key={item.id}
                        className={item.active ? 'acitve' : ""}
                        onClick={() => handleClick(item.id)} >
                         <Link to={item.link} className='links' >
                            {item.icon}
                            <span>{item.title}</span>
                         </Link>
                    </li>
                })}
            </ul>
            <div className='bottom-nav'>
                <li onClick={logOut}>
                    {signout} Sign Out
                </li>
            </div>
        </div>
    )
}
