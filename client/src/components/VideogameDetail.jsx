import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../redux/actions/index";
import "./Styles/VideogameDetail.css"
import Loading from "./loading";

export default function VideogameDetail (props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, []);

  const videogame = useSelector((state) => state.videogameDetails);

  console.log(videogame)

  return (
<div className="firstContainer" key={videogame.id}>
            {   
                
                videogame?
                
                <div className="detailContainer" key={videogame.id}>
                    <img className ="gameImg" src={videogame.image} alt="File Not Found" width="300px" hight="300px"/>
                    <div className ="gameDetail" key={videogame.id}>
                        <h1>{videogame.name}</h1>
                        <p><strong>Released: </strong>{videogame.released}</p>
                        <div className="ratingDetail"><strong>Rating: </strong><p className="ratingDetails">{videogame.rating}</p></div>
                        <div className="detailPlatform"><strong>Platforms: </strong>{videogame.platforms}</div>
                        <p><strong>Genre: </strong>{videogame.genres}</p>
                        <div><strong>Sinopsis: </strong><p>{videogame.description}</p></div>
                    </div>
             
                </div>
                  : <Loading/>
            }   

            <Link to="/home">
                <button className="backBtnDetail">Back</button>
            </Link>

            </div>
  );
}