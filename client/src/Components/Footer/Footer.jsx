import React, { Component } from 'react';
import logo from '../logo.jpg';
import instagram from './instagram.png';
import fb from './fb.png';

//This Component Hold Footer Section(Contact Details)
export default function Footer(){
    return(
        <footer className="contact-section">
                <img src={logo} alt="logo" className="logo-footer"></img>
                <div className="contact">
                    <div>CONTACT US</div>
                    <a href='https://www.instagram.com/ram_kumar_10r/' target="blank"><img src={instagram} alt="insta" className="insta"></img></a>
                    <a href='https://www.facebook.com/rohitram.rohitram.39' target='blank'><img src={fb} alt="fb" className="fb"></img></a>
                </div>
            </footer>
    )
}