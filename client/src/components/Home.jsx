import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../redux/actions";
import {Link} from "react-router-dom"
import VideogameCard from "./VideogameCard";
import { Fragment } from "react";


export default function Home(){

const dispatch = useDispatch()
const allVideogames = useSelector((state)=>state.videogames)

useEffect(()=>{
    dispatch(getVideogames());
},[dispatch])

function handleClick(e){
e.preventDefault();
dispatch(getVideogames())
}

return(
    <div>
    <Link to= "/videogame">Add Videogame</Link> 
    <h1>Videogames</h1> 
    <button onClick={e=> {handleClick(e)}} >Reload Videogames</button>
    <div>
        <select>
            <option value = "all" >All</option>
            <option value = "up" >Upward</option>
|            <option value = "down" >Falling</option>
        </select>

        <select>
            <option value = "all" >All</option>
            <option value = "alph" >Alphabet</option>
            <option value = "rating" >Rating</option>
            <option value = "genres" >Genres</option>
        </select>

        <select>
            <option value = "all" >All</option>
            <option value = "exist" >Existing</option>
            <option value = "created" >Created</option>
        </select>
 
{
    allVideogames?.map((el)=>{
        return (
            <Fragment>

                <Link to = {"/home/"+el.id}>

                <VideogameCard name={el.name} genres={el.genres} image={el.image} key={el.id}/>

                </Link>

            </Fragment>
          

        )
    })
}

    </div>
 
    </div>
)

}