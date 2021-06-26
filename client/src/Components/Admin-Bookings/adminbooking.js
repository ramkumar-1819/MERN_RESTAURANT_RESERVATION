import React, { Component,useEffect,useState } from 'react';
import axios from 'axios';
import { a } from '../Data'; //Hold the today's date

//This Section show how many bookings made by users and it visible to admin

export default function AdminBooking(){
    //booking - Hold all bookings based on the date
    const [booking,setBooking]=useState([])
    useEffect(()=>{
            getBookingDetails()
    },[])
    //method to get the bookings from backend
    const getBookingDetails=()=>{
        document.getElementById("edit").style.color="white";
            document.getElementById("buss").style.color="white";
            document.getElementById("book").style.color="yellow";
            axios.post('http://localhost:8080/getbookingadmin',{
                date:document.getElementById('date').value
            })
            .then(res=>{
                const result=[...res.data].reverse();
                setBooking(result);
            })
    }
    return(
            <>
              <div id="tbl" className="main">
                         <h1>All Bookings</h1>
                         <input type='date' id="date" defaultValue={a} max={a} onChange={getBookingDetails}></input>
                         <table id="bookinglist" className="all">
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
                             {booking.map((value,index)=>{
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
            </>
        )
}