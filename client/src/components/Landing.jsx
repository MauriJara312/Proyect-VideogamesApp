import React from "react";
import {Link} from "react-router-dom";
import "./Styles/landing.css"

export default function LandingPage(){
    return(
        <div className="landing">
            <h1>Welcome</h1>
            <Link to ="/home">
                <button>Go in</button>
            </Link>
        </div>
    )
}