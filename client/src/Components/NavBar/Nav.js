import React, { Component,useEffect,useState } from 'react';
import {Link} from 'react-router-dom'
import logo from '../logo.jpg';
import { withRouter } from 'react-router';
import axios from 'axios';

//Hold Link to Another Section
function Navigation(props){
    //user - check if user is login or not if login verify the user.
    const[user,setUser]=useState(false)
    //UseEffect - check user
    useEffect(()=>{
        axios.get('http://localhost:8080/verify',{withCredentials:true})
        .then(val=>{
            setUser(true)
            setColor()
        })
        .catch(err=>setColor())
    })
    //This UseEffect is used to disable the mouse rightclick and make scrollbar to initial position everytime navigating
    useEffect(()=>{
        window.addEventListener('contextmenu',avoid)
        window.scrollTo(0, 0);
    })
    const avoid=(e)=>{
          e.preventDefault()
    }
    //setColor - Give color to the Current Section in the Navigation Bar
    const setColor=()=>{
        if(props.location.pathname!=='/Signin' && props.location.pathname!=='/Signup' && props.location.pathname!=='/' && props.location.pathname!=='/Home' ){
            if(props.location.pathname.startsWith('/Account')){
                document.getElementById('Account').style.color="yellow"
            }
            else{
                console.log( document.getElementById(props.location.pathname.slice(1,props.location.pathname.length)))
                document.getElementById(props.location.pathname.slice(1,props.location.pathname.length)).style.color="yellow"
            }
        }
    }
    //This Component create a Navigation bar
    //This Show different Navigation Routes based on the User Logged in or not.
    return(
        <header>
                <Link to='/Home' id="Home"><img src={logo} alt="logo" className="logo"></img></Link> 
                <nav>
                    <Link to='/Menu' id="Menu">Menu</Link>
                    <Link to='/Gallery' id="Gallery">Gallery</Link>
                    <Link to='/Franchise' id="Franchise">Franchise</Link>
                    <Link to='/BookTable' id="BookTable">BookTable</Link>
                    {(user===true && props.location.pathname!=='/Signin' && props.location.pathname!=='/Signup') &&
                        <Link to='/Account' id="Account">Account</Link>
                    }
                    {(user===false || props.location.pathname==='/Signin' || props.location.pathname==='/Signup') &&
                        <>
                       <div><Link to='/Signin'><button type='button' className="signin-button">Sign In</button></Link></div>
                       <div><Link to='/Signup'><button type='button' className="signup-button">Sign Up</button></Link></div>
                       </>
                    }
                </nav>
            </header>
    )
}
export default withRouter(Navigation);