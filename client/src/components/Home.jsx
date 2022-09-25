import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, getAllGenres, filterByGenre, filterByRating, filterByAbc, filterByCreated} from "../redux/actions";
import {Link} from "react-router-dom"
import VideogameCard from "./VideogameCard";
import Paginated from "./Paginated";
import "./Styles/Home.css"
import Searchbar from "./Searchbar";
import NavBar from "./NavBar";

export default function Home(){

const dispatch = useDispatch()

//Me traigo todos los videogames y genereros del reducer
const genre = useSelector((state)=> state.genres)
const allVideogames = useSelector((state)=>state.videogames)


const [order, setOrder] = useState("")

//Paginado
const [currentPage, setCurrentPage] = useState(1)
const [videogamesPerPage,setVideogamesPerPage] = useState(15)
const lastVideogameIndex = currentPage * videogamesPerPage
const firstVideogameIndex = lastVideogameIndex - videogamesPerPage

//videojuegos que tengo actualmente en la pagina
const currentVideogames = allVideogames.slice(firstVideogameIndex,lastVideogameIndex)

const paginated = (pageNumber) => {
    setCurrentPage(pageNumber)
}

// Traigo los estados globales

useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);

useEffect(()=>{
    dispatch(getVideogames());
},[dispatch])

function reloadVideogames(e){
e.preventDefault();
dispatch(getVideogames())
}

//source Filter

function changeSource(e){
    e.preventDefault();
    e.target.value === "all"?
    dispatch(getVideogames())
    : dispatch(filterByCreated(e.target.value))
}
//genre filter

function changeGenre(e){
    e.preventDefault();
    dispatch(filterByGenre(e.target.value))
}

// Abc Filter

function changeAbc(e) {
    e.target.value === "default"? 
        dispatch(getVideogames())
        : dispatch(filterByAbc(e.target.value));
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`)
  }

// Rating filter

function changeRating(e) {
    e.target.value === "all"
      ? dispatch(getVideogames())
      : dispatch(filterByRating(e.target.value));
      setCurrentPage(1);
      setOrder(`Order ${e.target.value}`)
  }

return(
    <div className="HomeContainer">

    <h1 className="a" >Videogames</h1> 

    <button onClick={e=> {reloadVideogames(e)}} >Reload Videogames</button>

    <div className="ratingAndAbcFilters">
        <select onChange={e=> {changeRating(e) }}>
            <option value = "all" >All Ratings</option>
            <option value = "up" >High Rating</option>
|            <option value = "down" >Low Rating</option>
        </select>

        <select onChange={e=> {changeAbc(e)}}>
             <option value = "default" >Default Order</option>
             <option value = "A - Z" >A - Z</option>
|            <option value = "Z - A" >Z - A</option>
        </select>
        
    <div className="sourceAndGenresFilters">

        <select onChange={e=> {changeGenre(e) }} >
        <option value = "all" >All Genres</option>
        {
        genre?.map((e)=>{
            return (
                <option value = {e.name} >{e.name}</option>
            )})}

        </select>

        <select onChange={e=> {changeSource(e) }}>
            <option value = "all" >All Videogames</option>
            <option value = "api" >Api Videogames</option>
            <option value = "db" >DB Videogames</option>
        </select>

</div>

 
{/* Renderizo el componente Paginated pasandole mi estado*/}

<div className="paginatedDiv">
    

        <Paginated 
        videogamesPerPage={videogamesPerPage}
        allVideogames={allVideogames.length}
        paginated={paginated} 
        />

        <Searchbar/>

</div>

 <div className="allVideogames">
{
    currentVideogames?.map((el)=>{
        return (
            <div className="VideogameCard">

                <Link to = {"/home/"+el.id}>

                <VideogameCard name={el.name} genres={el.genres} image={el.image? el.image : <img src="client\src\noimg.jpg"></img>} key={el.id}/>

                </Link>

            </div>
          

        )
    })
}
</div>
    </div>
 
    </div>
)

}