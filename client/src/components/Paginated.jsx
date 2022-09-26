import React from "react";
import "./Styles/Paginated.css";

export default function Paginated ({ videogamesPerPage, allVideogames, paginated}){
    const pageNumbers = []

    for(let i = 0; i <= Math.floor(allVideogames/videogamesPerPage); i++){
        pageNumbers.push(i+1)
    }

    return(
    
    <nav className="containerPadre">

    <ul className="nums" >
        
    {
    pageNumbers?.map( (pageNumber) => {
            
    return(
    <li className="PageNumber" key={pageNumber}>
    <button className="button" onClick={()=> paginated(pageNumber)}>{pageNumber}</button>
    </li>

        )
        })
    }
    </ul>
    </nav>
)   
}