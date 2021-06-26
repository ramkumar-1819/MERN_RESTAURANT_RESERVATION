import React, { Component } from 'react';
import './Signin.css';
import Sample from'../book-a-table_img.jpg';
import Navigation from '../NavBar/Nav';
import axios from 'axios';

export default function Signin(props){
    //signinHandler - Check Form Validation and navigation if Credintials is Valid.
    const signinHandler=()=>{
        const username=document.getElementsByName('username_')[0].value;
        const password=document.getElementsByName('password_')[0].value;
        const alerter=document.getElementsByClassName('alerter_')[0];
        alerter.innerHTML=""
        if(username===""){
            alerter.innerHTML="Username Can't Be None";
            return
        }
        if(password===""){
            alerter.innerHTML="Password Can't Be None";
            return
        }
        axios.post('http://localhost:8080/signin',{
            username:document.getElementsByName('username_')[0].value,
            password:document.getElementsByName('password_')[0].value
        },{withCredentials:true})
        .then(val=>{
            console.log("Success")
            console.log(val)
                props.history.push({
                                    pathname:'/Account'
                                })
        })
        .catch(err=>{
            console.log("Error")
            if(err.response.data){
                alerter.innerHTML=err.response.data.error
            }
        })
    }
    return(
        <div>
            <Navigation/>
            <div className="signin-section">
                <img src={Sample} alt="sample_pic" className="sample"></img>
                <form className="signin-form">
                        <div>Sign-In to HOT Barbeque Account</div>
                        <div>
                            <label htmlFor="username_">Username</label>
                            <input type="text" name="username_"/>
                        </div>
                        <div>
                            <label htmlFor="password_">Password</label>
                            <input type="password" name="password_"/>
                        </div>
                        <div className="alerter_"></div>
                        <button type="button" onClick={signinHandler}>SignIn</button>
                </form>
            </div>
        </div>
 
    )
}