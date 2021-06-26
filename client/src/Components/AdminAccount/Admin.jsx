import React, { Component,useEffect,useState } from 'react';
import './Admin.css';
import Navigation from '../NavBar/Nav';
import axios from 'axios';
import { Link,Route} from 'react-router-dom';
import AdminBussiness from '../Admin-Bussiness/adminbussiness';
import AdminBooking from '../Admin-Bookings/adminbooking';
import AdminMenu from '../Admin-Menu/adminmenu';

//This ia admin's home page component
export default function Admin(props){
    //login - check wheather loggedin person is admin and his credintials are valid.
    const[login,setLogin]=useState(false);
    useEffect(()=>{
        axios.get('http://localhost:8080/verify',{withCredentials:true})
        .then(val=>{
                    setLogin(true)
                })
    },[])
    //logoutt - when logout button is clicked navigate to Home Page
    const logoutt=()=>{
        console.log("out")
        axios.get('http://localhost:8080/logout',{withCredentials:true})
        .then(val=>{
            props.history.push('/Home')
        })
    }
    return(
        <>
        {login===true &&
        <div className="admin-section"> 
                <Navigation/>
                <div className="admins">
                    <div className="routess">
                        <Link to='/Account/Edit'><div id="edit" >Edit Menu</div></Link>
                        <Link to='/Account/Book'><div id="book" >Bookings</div></Link>
                        <Link to='/Account/Bussiness'><div id="buss" >Bussiness</div></Link>
                        <div className="logout-admin" onClick={logoutt}>Logout</div>
                    </div>
                        <Route exact path='/Account' component={AdminBooking}/>
                        <Route path='/Account/Book' component={AdminBooking}/>
                        <Route path='/Account/Bussiness'component={AdminBussiness}/>
                        <Route path='/Account/Edit' component={AdminMenu}/>               
                </div>
        </div>
        }
        {login===false &&
            <div></div>
        }
        </>
    )
}