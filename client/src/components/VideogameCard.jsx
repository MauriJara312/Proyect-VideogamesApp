import React from "react";
import "./Styles/VideogameCard.css"

export default function VideogameCard ({image, name, genres}){

    return(
        <div className="videogameDiv"> 
            <h3>{name}</h3>
            <p>{genres}</p>
            <img src={image} alt={name} width="200px" height="250px"/>
        </div>
    )
}