import React, { Component } from 'react';
import Navigation from '../NavBar/Nav';
import axios from 'axios';
import './Franchise.css'
import {a} from '../Data'; //Hold the current Date

//This Component has Form for Bussiness Investors who want to patner with us.
export default function Franchise(props){
    //submitForm - To handle Validation and Submit to backend
    const submitForm=()=>{
        const name=document.getElementById('franchise-name').value;
        const mobile=document.getElementById('franchise-mobile').value;
        const email=document.getElementById('franchise-email').value;
        const amount=document.getElementById('franchise-amount').value;
        const msg=document.getElementById('franchise-comment').value;
        const alerter=document.getElementById('franchise-alerter');
        alerter.innerHTML="";
        if(name===""){
            alerter.innerHTML="Name Shouldn't Be Null";
            return
        }
        if(!/^[a-zA-Z]+$/g.test(name)){
            alerter.innerHTML="Name Contain Alphabets Only with no whitespace";
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
        if(amount==="Select the Investment value"){
            alerter.innerHTML="Select the Investing Amount";
            return
        }
        axios.post('http://localhost:8080/investor',{
            name:name,
            mobile:mobile,
            email:email,
            amount:amount,
            msg:msg,
            date_booked:a
        })
        .then(val=>{
            alert("Thankyou for your interest We will Contact you Soon");
            window.location.reload()
        })
    }
    return(
        <div>
            <Navigation/>
            <div className="franchising-section">
                <h2>Franchising</h2>
                <p>A powerful brand identity, proven concept, competitively priced start-up costs, refreshed menu every week, consistently delivering great products with exceptional service, comprehensive training programs, innovative marketing and hands-on operational support are just a few of the reasons HOT BARBECUES franchise holds a dominant position in the barbecue and buffet restaurant segment.</p>
                <form id="invest-form">
                    <h2>LEARN MORE</h2>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="franchise-name"></input>
                    </div>
                    <div>
                        <label htmlFor="mobile">Mobile Number</label>
                        <input type="number" id="franchise-mobile"></input>
                    </div>
                    <div>
                        <label htmlFor="email">E-Mail</label>
                        <input type="email" id="franchise-email"></input>
                    </div>
                    <div>
                        <label htmlFor="amount">Investment Range</label>
                        <select name="investing" id="franchise-amount">
                            <option value="Select the Investment value" disabled>Select the Investment value</option>
                            <option value="<1L">Less than 1L</option>
                            <option value="1L-10L">Between 1L-10L</option>
                            <option value="10L-50L">Between 10L-50L</option>
                            <option value=">50L">Greater than 50L</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="comment">Comment</label>
                        <textarea id="franchise-comment"></textarea>
                    </div>
                    <div id='franchise-alerter'></div>
                    <button type="button" onClick={submitForm}>SUBMIT</button>
                </form>
            </div>            
        </div>
    )
}