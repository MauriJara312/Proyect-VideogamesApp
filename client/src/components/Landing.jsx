import React from "react";
import {Link} from "react-router-dom";

export default function LandingPage(){
    return(
        <div>
            <h1>Wellcome</h1>
            <Link to ="/home">
                <button>Go in</button>
            </Link>
        </div>
    )
}