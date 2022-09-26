import React from "react";
import "./Styles/VideogameCard.css"

export default function VideogameCard ({image, name, genres, rating}){

    return(
        <div className="cardContainer">
        <div className="card"> 
        <img src={image} alt='img' className="cardImg"/>
        <div  className="cardInfo">
        <p  className="textTitle">{name}</p>
        <p  className="textBody">{genres}</p>
        </div>
        <div  className="cardFooter">
          <div className="ratybuton">
            <div>
            <img className="star" src="https://i.ibb.co/xSfqgcG/star.png" alt="" />  
          <span  className="textTitle">{rating}</span>
        </div>
        </div>
          </div>
        </div>
      </div>
    
    )
}