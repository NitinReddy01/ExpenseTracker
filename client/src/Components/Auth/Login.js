import React, { useState } from "react";
import axios from "../../Api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom"
import useAuth from "../../Hooks/useAuth";
import './style.css';

export default function Login(props) {
    const [uname, setUname] = useState("");
    const [pword, setPword] = useState("");
    const [error, setError] = useState(false);
    const [errorInfo, setErrorInfo] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const {setUser}=useAuth();

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
                        <input className="pword" type="password" placeholder="Password" value={pword} required onChange={(e) => { setPword(e.target.value) }} />
                    </div>
                    <div className="or1">
                        not a member?<Link className="orsign" to="/register" > signup now </Link><br></br>
                    </div>
                    <div className="loginbtn">
                        <button className="but" onClick={login} >SIGN IN</button>
                    </div>
                </div>
            </form>
        </>
    )
}