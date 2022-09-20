import React from "react";


export default function VideogameCard ({image, name, genres}){

    return(
        <div>
            <h3>{name}</h3>
            <p>{genres}</p>
            <img src={image} alt={name} width="200px" height="250px"/>
        </div>
    )
}