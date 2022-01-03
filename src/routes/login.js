import React, { useEffect, useState } from "react";
import "../App.css";
import { login,signup } from "../app/actions/auth";
import { useNavigate } from "react-router-dom"
import {getUser} from '../app/Selector/selector'
function Login() {
    const navigate= useNavigate()
    useEffect(()=>{
        let loggedInUser=getUser();
        if (loggedInUser != null){
            navigate("/")
        }
    },[])
    const loginUser = (e) =>{
        e.preventDefault();
        let email = e.target.email.value
        let password = e.target.password.value
        login(email,password).then(e=>{
            console.log(e)
            navigate("/")
        }).catch(err=>console.log(err))
    }
    const signupUser = (e) =>{
        e.preventDefault();
        let email = e.target.email.value
        let password = e.target.password.value
        signup(email,password).then(e=>{
            console.log(e)
            navigate("/")
        }).catch(err=>console.log(err))
    }
  return (
    <div className="Login">
      <div className="login-form-div" style={{borderRight:'2px solid #252525'}}>
          <h3>Dont Have a Account?</h3>
      <form onSubmit={signupUser}>
          <div className="login-input-div">
          <label>
            Email</label>
            <input
              name="email"
              type="text"
            /></div>
          <div className="login-input-div">
          <label>
            Password</label>
            <input
              name="password"
              type="password"
            />
            </div>
          <input className="login-form-action" type="submit" value="Sign Up" />
        </form>
      </div>
      <div className="login-form-div">
      <h3>Please Login to Continue</h3>
      <form onSubmit={loginUser}>
      <div className="login-input-div">
          <label>
            Email</label>
            <input
              name="email"
              type="text"
            /></div>
          <div className="login-input-div">
          <label>
            Password</label>
            <input
              name="password"
              type="password"
            />
            </div>
          <input className="login-form-action" type="submit" value="Log In" />
        </form>
      </div>
    </div>
  );
}

export default Login;
