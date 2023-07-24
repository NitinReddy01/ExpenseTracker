import React, { useState } from "react";
import axios from '../Api/axios';
import { Link,useNavigate } from "react-router-dom";

export default function Register(props) {
    const [uname, setUname] = useState("");
    const [pword, setPword] = useState("");
    const [confirmPword, setConfirmPword] = useState("");
    const [error, setError] = useState(false);
    const [errInfo, setErrInfo] = useState("");
    const navigate=useNavigate();

    const unameChange = (event) => {
        setUname(event.target.value);
    }
    const pwrodChange = (event) => {
        setPword(event.target.value);
    }
    const cpwordChange = (event) => {
        setConfirmPword(event.target.value);
    }
    const register = async (event) => {
        event.preventDefault();
        if (uname === '' || pword === '' || confirmPword === '') {
            setError(true);
            setErrInfo("Please enter all the fields")
        }
        else if (pword !== confirmPword) {
            setError(true);
            setErrInfo("Passwords do not match");
        }
        else {
            setError(false);
            let user = {
                uname: uname,
                pword: pword
            }
            try{
                const res=await axios.post('/register',user);
                console.log(res);
                navigate('/login',{replace:true});
            }
            catch(err){
                setError(true);
                if(!err?.response){
                    setErrInfo('No response from the server')
                }
                else if(err.response?.status===409){
                    setErrInfo('Username Taken')
                }
                else{
                    setErrInfo('Registration Failed')
                }
            }
        }
    }
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                }}>
                <h2>{errInfo}</h2>
            </div>
        );
    };
    return (
        <>  
            <form action="/">
                <div className="box">
                    <div className="login">
                        Sign Up
                    </div>
                    <div className="message">
                        {errorMessage()}
                    </div>
                    <div className="username">
                        <input className="uname" value={uname} onChange={unameChange} type="text" placeholder="username" required />
                    </div>
                    <div className="password">
                        <input className="pword" value={pword} onChange={pwrodChange} type="password" placeholder="password" required />
                    </div>
                    <div className="password">
                        <input className="pword" value={confirmPword} onChange={cpwordChange} type="password" placeholder="confirm password" required />
                    </div>
                    <div className="or1">
                        already a member?<Link className="orsign" to="/login" > signin </Link><br></br>
                    </div>
                    <div className="loginbtn">
                        <button className="but" onClick={register}>SIGN UP</button>
                    </div>
                </div>
            </form>
        </>
    );
}