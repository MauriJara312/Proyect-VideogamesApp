import React from "react";
import {Link} from "react-router-dom";
import "./Styles/landing.css"

export default function LandingPage(){
    return(
        <div className="landing">

            <div className="tittle">
            <h1 >VIDEOGAMES APP</h1>
            <Link to ="/home">
                <button className="button">START</button>
            </Link>
            </div>
            
        </div>
    )
}