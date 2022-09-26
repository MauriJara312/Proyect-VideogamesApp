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
import Loading from "./loading";

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

//////////////////////////RENDER///////////////////////////////////


return(

<div className="HomeContainer"> 

    <NavBar></NavBar>

    {/* <button onClick={e=> {reloadVideogames(e)}} >Reload Videogames</button> */}

<div className="paginatedDiv">
    
        <Paginated 
        videogamesPerPage={videogamesPerPage}
        allVideogames={allVideogames.length}
        paginated={paginated} 
        />
        

</div>

 <div className="containerCards">
{   currentVideogames.length>0?
    currentVideogames?.map((el)=>{
        return (
            <div>

                <Link to = {"/videogame/"+el.id}>

                <VideogameCard name={el.name} genres={el.genres} rating={el.rating} image={el.image? el.image : <img src="client\src\noimg.jpg"></img>} key={el.id}/>

                </Link>

            </div>
          
        );
    })
    :<Loading/>
}
    </div>

{/* //////////////////////////filters///////////////////////////////// */}

<div className="filters">

<h4 className="underline">Filters</h4>

<div className="aligns">

<p>Genres:</p>

    <select onChange={e=> {changeGenre(e) }} >
    <option value = "all" >All Genres</option>
    {
    genre?.map((e)=>{
        return (
            <option value = {e.name} >{e.name}</option>
        )})}

    </select>


<p>Source:</p>

    <select className="options" onChange={e=> {changeSource(e) }}>
                <option value = "all" >All Videogames</option>
                <option value = "api" >Api Videogames</option>
                <option value = "db" >DB Videogames</option>
    </select>

<div className="sortingContainer">

<h5 className="underline">Sorting</h5>

<div className="aligns">

<p>Rating:</p>

    <select  className="options" onChange={e=> {changeRating(e) }}>
        <option value = "all" >All Ratings</option>
        <option value = "up" >High Rating</option>
|            <option value = "down" >Low Rating</option>
    </select>


</div>

<p>Alphabetical Order:</p>

    <select className="options" onChange={e=> {changeAbc(e)}}>
         <option value = "default" >Default Order</option>
         <option value = "A - Z" >A - Z</option>
|            <option value = "Z - A" >Z - A</option>
    </select>


</div>
</div>

</div>

/</div>

)}
