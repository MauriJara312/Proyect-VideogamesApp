import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogameByName } from "../redux/actions";


export default function Searchbar({setCurrentPage}){

    const dispatch = useDispatch();

    const [name , setname] = useState("");


    function handleChange(e){
        e.preventDefault();
        setname(e.target.value)
        
    }

    function searchGame(e){
        e.preventDefault();
        dispatch(getVideogameByName(name))
        setname("")
        setCurrentPage(1)
    }


    return(
        <div>
            <input type={"text"} placeholder="Search..." onChange={(e)=> {handleChange(e) }} />

            <button type="submit" onSubmit={(e)=> {searchGame(e) }} >Search</button>
        </div>
    )
}