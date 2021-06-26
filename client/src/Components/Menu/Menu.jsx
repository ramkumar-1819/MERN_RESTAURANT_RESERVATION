import React, { Component,useEffect,useState } from 'react';
import Navigation from '../NavBar/Nav';
import Footer from '../Footer/Footer';
import './Menu.css'
import logo from '../logo.jpg'
import axios from 'axios'

//This Hold Menus of the Restaurant
export default function Menu(props){
    //menu - Hold menu from backend
    const [menu,setMenu]=useState([])
   //UseEffect - get menus from Backend
    useEffect(()=>{
        axios.get('http://localhost:8080/menu')
        .then(val=>{
            console.log(val.data)
            setMenu(val.data)
            })
    },[]) 
    return(
        <div>
            <Navigation/>
            <div className="menu-page">
                <h2>Menu</h2>
                <p>Global Menu, Unlimited food, Live counters for personalized dishes, ‘just the way you like it’ concept & mouth-watering deserts. At Coal Barbecues, we have it all! With more than 100 dishes any given week, our menu would leave you wanting for nothing more. We barbecue, roast, grill, steam, boil, stir-fry, griddle, bake, fast-fry, and fast freeze your food, to give you that perfect taste. With a wide variety of cuisine, cooking styles, and choice of dishes, each dining experience at Coal Barbecues is an adventure in itself.</p>
                {menu.map((values,index)=>{
                    return(
                        <div key={index} className="menu-items">
                            <h2>{values.name}</h2>
                            <div className="items_images">
                                <ul className="listofitems">
                                {values.items.map((val,index)=>{
                                    return(
                                        <div key={index}>
                                            <li className="items">{val}</li>
                                        </div>
                                    )
                                })}
                                </ul>
                                <img src={`http://localhost:8080/${values.image}`} alt="dishes" className="dishes"></img>
                            </div>
                        </div>
                        )
                })}
                 <img src={logo} alt="logo" className="menu-logo"></img>
            </div>
        </div>
    )
}