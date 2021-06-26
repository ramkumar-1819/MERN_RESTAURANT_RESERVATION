import React, { Component,useState,useEffect } from 'react';
import Navigation from '../NavBar/Nav';
import './User.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import Admin from '../AdminAccount/Admin';
import { withRouter } from 'react-router';

//Accout component render Account of user or admin based on loggedin Person
function Account(props){
    //user - Hold if user is logedin or not and hold if loggedin person is user or admin
    const[user,setUser]=useState({login:"",type:""})
    console.log(user)
    //details - Hold user booking history details
    const[details,setDetails]=useState([])
    //useEffect - check logged in person credentials
    //Hold user booking history if logged in person is User.
    useEffect(()=>{
        axios.get('http://localhost:8080/verify',{withCredentials:true})
        .then(val=>{
            setUser({login:true,type:val.data.type});
            axios.post('http://localhost:8080/getbookinguser',{
            user:val.data.id
            })
            .then(result=>{
                const results=[...result.data].reverse()
                setDetails(results)
            })
        })
        .catch(err=>{
            console.log(err.response.data)
            setUser({...user,login:false})
        })
    },[])
    //logout - Navigate to Home and logout the user
    const logout=()=>{
        axios.get('http://localhost:8080/logout',{withCredentials:true})
        .then(val=>{
            setUser({login:false,type:""})
            props.history.push('/Home')
        })
    }
    
    return(
        <>
        {(user.login===true && user.type==="admin") && 
        <>
            <Admin {...props}/>
        </>
        }
        {(user.login===true && user.type==="user") && 
        <>
            <Navigation/>
            <div className="user-section">
                <button className="logout-button" onClick={logout}>Logout</button>
                <div className="users">
                    <h1>Welcome to HOT Barbeque..........</h1>
                    <div className="history">
                        <h3>Your Booking History</h3>
                       <div id="tbl">
                        <table id="bookinglist">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>MobileNumber</th>
                                    <th>Email</th>
                                    <th>Date</th>
                                    <th>Time Slot</th>
                                    <th>Number of Guest</th>
                                    <th>Branch</th>
                                    <th>Message</th>
                                </tr>
                            </thead>
                            <tbody>
                            {details.map((value,index)=>{
                                return(
                                <tr key={index}>
                                    <td>{value.name}</td>
                                    <td>{value.mobile}</td>
                                    <td>{value.email}</td>
                                    <td>{value.date}</td>
                                    <td>{value.slot}</td>
                                    <td>{value.guest}</td>
                                    <td>{value.branch}</td>
                                    <td>{value.msg}</td>
                                </tr>
                                )
                            })
                            }
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
        }
        {user.login===false &&
            <Redirect to={{pathname:'/Home'}}/>
        }
        {user.type==="" &&
            <div></div>
        }
        </>
        
    )
}
export default withRouter(Account);