import React from "react";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";

export default function NavBar(){

    return(
        <div>
<Link to="home">Home</Link>

<Link to= "/videogame">Add Videogame</Link> 

<Searchbar/>
        </div>
    )
}