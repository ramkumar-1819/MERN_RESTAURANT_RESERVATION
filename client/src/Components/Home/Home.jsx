import React, { Component,useEffect } from 'react';
import {Link} from 'react-router-dom';
import logo from '../logo.jpg';
import tnagar from './tnagar.jpg';
import velachery from './velachery.jpeg';
import  navalur from './navalur.jpeg';
import intro from './about.mp4';
import './Home.css';
import Navigation from '../NavBar/Nav';
import Footer from '../Footer/Footer';

//Home Component
export default function Home(){
    return(
        <div id="HomeComponent">
            <div className="video-container">
                <video className="introVideo" autoPlay muted loop>
                    <source src={intro} type='video/mp4'></source>
                </video>
            </div>
            <Navigation/>
            <article className="about-section">
                <h2>About Us</h2>
                    <div>
                        <p className="about">Are you looking for the best buffet or bbq restaurant in town? We have delighted over half a million customers since our launch in 2015.<br></br><br></br>
                        With over 100 dishes on the menu, live grill on the table, and multiple live counters, Hot Barbecues is the perfect place to celebrate your special occasion.
                        Be it an office team outing, birthday or anniversary celebration, or a reunion with your friends after a long time, our staff are waiting to help to make your
                        day magical one.<br></br><br></br>Vegan diet or paleo diet, picky eater or marathon eater, our menu features a global cuisine with special focus on dishes from Indian, American, 
                        Mediterranean and South East Asian regions. With a live grill on every table, you can barbecue the partly-cooked vegetables and meats to exactly to the way you
                        like it. We also have a wide variety of live counters, from main course to desserts, all designed to delight you. Our trained chefs at every live counter are 
                        there to make each dish suit to your exact taste and preferences.
                        </p>
                        <img src={logo} alt="logo" className="big-logo"></img>
                    </div>
            </article>
            <div className="branches">
                <div className="branches-logo">
                    <img src={navalur} alt="navalur pic"></img>
                    <h1>Navalur</h1>
                </div>
                <div className="branches-logo">
                    <img src={tnagar} alt="tnagar pic"></img>
                    <h1>T Nagar</h1>
                </div>
                <div className="branches-logo">
                    <img src={velachery} alt="velachery pic"></img>
                    <h1>Velachery</h1>
                </div>
            </div>
            <Footer/>
        </div>
    )
}