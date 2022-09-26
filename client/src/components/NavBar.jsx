import React from "react";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";

export default function NavBar(setCurrentPage){

    return(
        <div className="container">
            <div className="separate">
                
                    <div className="container1">

<Link className="link" to="home"><span>Home</span></Link>

<Link className="link" to= "/videogame"><span>Add Videogame</span></Link> 

                    </div>

            </div>

<Searchbar setCurrentPage={setCurrentPage}/>

        </div>
    )
}