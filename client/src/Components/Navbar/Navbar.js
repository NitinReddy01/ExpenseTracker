import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import { signout } from '../../utils/icons';
import './navbar.css';
import {dashboard, expenses, transactions, trend} from '../../utils/icons';

export default function Navbar() {
    const { user } = useAuth();
    const [menu, setMenu] = useState([
        {
            id: 1, title: 'Dashboard', icon: dashboard, link: '/dashboard', active: false
        },
        {
            id: 2, title: "View Transactions", icon: transactions, link: "/dashboard", active: false
        },
        {
            id: 3, title: "Incomes", icon: trend, link: "/incomes", active: false
        },
        {
            id: 4, title: "Expenses", icon: expenses, link: "/expense", active: false
        },
    ])
    const handleClick = (id) => {
        console.log("click",id);
        console.log(menu);
        setMenu((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, active: !item.active } : item
            )
        );
        console.log(menu);
    };
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
                            className={item.active?'acitve':""}
                            onClick={()=>handleClick(item.id)} >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                })}
            </ul>
            <div className='bottom-nav'>
                <li>
                    {signout} Sign Out
                </li>
            </div>
        </div>
    )
}
