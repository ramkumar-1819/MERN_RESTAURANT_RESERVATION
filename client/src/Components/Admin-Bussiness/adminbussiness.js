import React, { Component,useState,useEffect } from 'react';
import axios from 'axios';
import { a } from '../Data'; //Hold current Date

//This show's the details of the persons to admin who want to partner with us
export default function AdminBussiness(){
    //investors - Hold all the details of investors based on date
    const [investors,setInvestors]=useState([]);
    useEffect(()=>{
        getBussiness()
    },[])
    //get data from backend
    const getBussiness=()=>{
        document.getElementById("edit").style.color="white";
        document.getElementById("buss").style.color="yellow";
        document.getElementById("book").style.color="white";
        axios.post('http://localhost:8080/getinvestor',{
            date:document.getElementById('inv-date').value
        })
        .then(res=>{
            const result=[...res.data].reverse();
                setInvestors(result);
        })
    }
    return(
        <>
              <div id="tbl" className="main">
                         <h1>All Bussiness Deals</h1>
                         <input type='date' id="inv-date" defaultValue={a} max={a} onChange={getBussiness}></input>
                         <table id="bookinglist" className="all">
                             <thead>
                                 <tr>
                                     <th>Name</th>
                                     <th>MobileNumber</th>
                                     <th>Email</th>
                                     <th>Investing Range</th>
                                     <th>Message</th>
                                 </tr>
                             </thead>
                             <tbody>
                             {investors.map((value,index)=>{
                                 return(
                                 <tr key={index}>
                                     <td>{value.name}</td>
                                     <td>{value.mobile}</td>
                                     <td>{value.email}</td>
                                     <td>{value.amount}</td>
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