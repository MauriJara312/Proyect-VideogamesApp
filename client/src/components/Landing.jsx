import React from "react";
import {Link} from "react-router-dom";
import "./Styles/landing.css"

export default function LandingPage(){
    return(
        <div className="landing">

            <div className="tittle">
            <h1 >Welcome</h1>
            <Link to ="/home">
                <button className="button">Go in</button>
            </Link>
            </div>
            
        </div>
    )
}