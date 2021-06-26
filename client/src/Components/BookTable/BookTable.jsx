import React, { Component,useEffect,useState } from 'react';
import Navigation from '../NavBar/Nav';
import './BookTable.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { a } from '../Data'; //Hold Current Date

//This component display a form for user to Book a Table
//User can Only book a table if he/she have a account in this app.
export default function BookTable(props){
    //user - hold wheather user is loggedin or not
    const[user,setUser]=useState(false)
    //id - hold loggedin user id
    const[id,setId]=useState("")
    //UseEffect - check user is loggedin or not and if loggedin check his/her credintials.
    useEffect(()=>{
        axios.get('http://localhost:8080/verify',{withCredentials:true})
        .then(val=>{
                    setUser(true)
                    setId(val.data.id)
                })
    },[])
    //booktable - check form Validation
    //And Submit to backend if Validation Success
    const booktable=()=>{
        const name=document.getElementById('book-name').value;
        const mobile=document.getElementById('book-mobile').value;
        const email=document.getElementById('book-email').value;
        const date=document.getElementById('book-date').value;
        const slot=document.getElementById('slot').value;
        const guests=document.getElementById('guests').value;
        const branch=document.getElementById('branch').value;
        const msg=document.getElementById('comment').value;
        const alerter=document.getElementById('alerter');
    
        alerter.innerHTML="";
        if(name===""){
            alerter.innerHTML="Name Shouldn't Be Null";
            return
        }
        if(!/^[a-zA-Z]+$/g.test(name)){
            alerter.innerHTML="Name Contain Alphabets Only";
            return
        }
        if(mobile===""){
            alerter.innerHTML="Mobile Number Shouldn't be Null";
            return
        }
        if(!/^[\d+][\d]{9,15}$/g.test(mobile)){
            alerter.innerHTML="Mobile Number is not Valid";
            return
        }
        if(email===""){
            alerter.innerHTML="Email Shouldn't be Null";
            return
        }
        if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
            alerter.innerHTML="Email is Not Valid";
            return
        }
        if(date===""){
            alerter.innerHTML="Date Shouldn't be Null";
            return
        }
        if(slot==="Select the Slot"){
            alerter.innerHTML="Select the Time Slot";
            return
        }
        if(guests===""){
            alerter.innerHTML="Enter the Number of Guests";
            return
        }
        if(branch==="Select the Branch"){
            alerter.innerHTML="Select the Branch";
            return
        }
        axios.post('http://localhost:8080/booktable',{
            name:name,
            mobile:mobile,
            email:email,
            date:date,
            slot:slot,
            guest:guests,
            branch:branch,
            msg:msg,
            user:id,
            date_booked:a
        })
        .then(val=>props.history.push({pathname:'/Account'}))
    }
    return(
        <div>
            <Navigation/>
            {user===false &&
                 <div className="msg-booktable">
                     <h1>Please Login to Continue !!!</h1>
                     <Link to='/Signin'><button type="button">Login</button></Link>
                 </div>
            }
            {user===true &&
                <div className="table-booking-section">
                    <h2>BOOK YOUR TABLE</h2>
                    <form id="booking-form">
                            <input type="text" id="book-name" placeholder="Enter your name"></input>
                            <input type="text" id="book-mobile" placeholder="Enter your Mobile number"></input>
                            <input type="email" id="book-email" placeholder="Enter your Email"></input> 
                            <div className="slot-date">
                            <input type="date" id="book-date"></input>   
                            <select name="slot" id="slot" >
                                    <option value="Select the Slot" selected disabled>Select the Slot</option>  
                                    <option value="12PM-2PM">12PM-2PM</option>
                                    <option value="2.30PM-4.30PM">2.30PM-4.30PM</option>
                                    <option value="5PM-7PM">5PM-7PM</option>
                                    <option value="7.30PM-9.30PM">7.30PM-9.30PM</option>
                            </select>
                            </div>
                            <input type="number" id="guests" placeholder="Enter the Number of Guests" min="1" max="25"></input>
                            <select name="branch" id="branch">
                                <option value="Select the Branch" selected disabled>Select the branch</option>
                                <option value="TNagar">TNagar</option>
                                <option value="Navalur">Navalur</option>
                                <option value="Velachery">Velachery</option>
                            </select>
                            <textarea id="comment" placeholder="Any Special Message"></textarea>
                            <div id="alerter"></div>
                            <button type="button" onClick={booktable}>SUBMIT</button>
                    </form>
                </div>}
        </div>
    )
}       
                            
                            
                       
                   