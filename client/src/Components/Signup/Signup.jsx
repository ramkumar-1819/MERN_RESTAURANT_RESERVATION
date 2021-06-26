import React, { Component,useEffect,useState } from 'react';
import Navigation from '../NavBar/Nav';
import Sample from '../book-a-table_img.jpg';
import './Signup.css';
import axios from 'axios';

export default function Signup(props){
    //Perform Formvalidation and Submit to Backend
    const signupHandler=()=>{
        let alert_msg=document.getElementsByClassName('alerter')[0];
        const username=document.getElementsByName('username')[0].value;
        const password=document.getElementsByName('password')[0].value;
        const re_password=document.getElementsByName('re-password')[0].value;
        const username_pattern=/^[\d\D]{5,25}/;
        const password_pattern=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        alert_msg.innerHTML="";
        if(username===""){
            alert_msg.innerHTML="Username Can't Be Empty"
            return
        }
        if(password===""){
            alert_msg.innerHTML="Password Can't Be Empty"
            return
        }
        if(re_password===""){
            alert_msg.innerHTML="Re-Type Password Can't Be Empty"
            return
        }
        if(password!==re_password){
            alert_msg.innerHTML="Passwords are not matching"
            return
        }
        if(!username_pattern.test(username)){
            alert_msg.innerHTML="Username Contain 5-25 Characters"
            return
        }
        if(!password_pattern.test(password)){
            alert_msg.innerHTML="Password Should be Strong"
            return
        }
        axios.post('http://localhost:8080/signup',{
            username:username,
            password:password
        })
        .then(ok=>props.history.push('/Signin'))
        .catch(err=>{
           if(err.response.data){
               alert_msg.innerHTML=err.response.data.error;
           }
        })
    }
    return(
        <div>
            <Navigation/>
            <div className="signup-section">
                <img src={Sample} alt="sample_pic" className="sample"></img>
                <form className="signup-form">
                        <div>Create HOT Barbeque Account</div>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username"/>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password"/>
                        </div>
                        <div>
                            <label htmlFor="re-password">Re-Type password</label>
                            <input type="psaaword" name="re-password"/>
                        </div>
                        <div className="alerter"></div>
                        <button type="button" onClick={signupHandler} >SignUp</button>
                </form>
            </div>
        </div>
    )
}