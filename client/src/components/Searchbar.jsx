import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogameByName } from "../redux/actions";
import "./Styles/NavBar.css"

export default function Searchbar(setCurrentPage){

    const dispatch = useDispatch();

    const [name , setname] = useState("");

    console.log(name)




    function handleChange(e){
        e.preventDefault();
        setname(e.target.value)
        
    }

    function searchGame(e){
        e.preventDefault();
        dispatch(getVideogameByName(name))
        setname("")

    }


    return(
        <div className="a">
            <input type="text" placeholder="Search..." onChange={(e)=> {handleChange(e)} } />

            <button type="submit" onClick={(e)=> {searchGame(e) }} >Search</button>
        </div>
    )
}