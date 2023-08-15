import React, { useState } from 'react';
import useAuth from '../Hooks/useAuth';
import { signout } from '../utils/icons';
import { dashboard, expenses, transactions, trend } from '../utils/icons';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../Hooks/useAxiosPrivate';
import { styled } from 'styled-components';

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
                item.id === id ? { ...item, active: true } : {...item,active:false}
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
        <NavStyle>
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
                        className={item.active ? 'acitve' : ''}
                        onClick={() => handleClick(item.id)} >
                         <Link to={item.link} className='links' >
                            {item.icon}
                            <span>{item.title}</span>
                         </Link>
                    </li>
                })}
            </ul>
            <div className='bottom-nav '>
                <li onClick={logOut}>
                    {signout} Sign Out
                </li>
            </div>
        </NavStyle>
    )
}

const NavStyle=styled.div`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        h2{
            color: rgba(34, 34, 96, 1);
        }
        p{
            color: rgba(34, 34, 96, .6);
        }
    }
    .items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li,.links{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            i{
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }
    .active{
        color: rgba(34, 34, 96, 1) !important;
        i{
            color: rgba(34, 34, 96, 1) !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }
`;
