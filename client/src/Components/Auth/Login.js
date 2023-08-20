import React, { useEffect, useState } from "react";
import axios from "../../Api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom"
import useAuth from "../../Hooks/useAuth";
import './style.css';

export default function Login(props) {
    const [uname, setUname] = useState("");
    const [pword, setPword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState(false);
    const [errorInfo, setErrorInfo] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const {setUser,persist,setPersist}=useAuth();

    const login = async (event) => {
        event.preventDefault();
        // console.log(uname, pword);
        let user = {
            uname: uname,
            pword: pword
        }
        try {
            const res = await axios.post('/auth/login', user);
            // console.log(res.data);
            setUname('');
            setPword('');
            setError(false);
            setErrorInfo('');
            setUser({id:res.data.id,...user,accessToken:res.data.accessToken});
            navigate(from,{replace:true});
        }
        catch (err) {
            setError(true);
            if (!err?.response) {
                setErrorInfo('No response from the server')
            }
            else if (err.response?.status === 400) {
                setErrorInfo("Missing username or password")
            }
            else if (err.response?.status === 401) {
                setErrorInfo('Check your username or password')
            }
            else {
                setErrorInfo('login Failed')
            }
        }
    }
    // to display msg if any of the fields are empty
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                }}>
                <h2 className="error">{errorInfo}</h2>
            </div>
        );
    };

    useEffect(()=>{
        localStorage.setItem("persist",persist);
    },[persist]);

    return (
        <>
            <form >
                <div className="loginBox">
                    <div className="login">
                        Sign In
                    </div>
                    <div className="message">
                        {errorMessage()}
                    </div>
                    <div className="username">
                        <input className="uname" type="text" placeholder="Username" value={uname} required onChange={(e) => setUname(e.target.value)} />
                    </div>
                    <div className="password">
                        <div className="pass-con" >
                            <input className="pword" type={showPass?"text":"password"} placeholder="Password" value={pword} required onChange={(e) => { setPword(e.target.value) }} />
                            <i className={showPass?"fa fa-eye-slash":"fa fa-eye"} aria-hidden="true" 
                            onClick={()=>{setShowPass(!showPass)}} ></i>
                         </div>
                    </div>
                    <div className="or1">
                        not a member?<Link className="orsign" to="/register" > signup now </Link><br></br>
                    </div>
                    <div className="loginbtn">
                        <button className="but" onClick={login} >SIGN IN</button>
                        <br/>
                        <input id="persist" type="checkbox" onChange={()=>setPersist(!persist)} checked={persist} />
                        <label htmlFor="persist"> Remember Me</label>
                    </div>
                </div>
            </form>
        </>
    )
}