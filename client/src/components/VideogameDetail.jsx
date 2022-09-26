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

  return (
    <div className="containerPadre">
      {videogame.length > 0 ? (
        <div className="container1">
          <div className="header">
            <Link to='/home'>
            <button className="detailButton">Back Home</button>
            </Link>
          </div>

          <div className="center">

          <div className="containerImgDescrep">
            <div
              style={{
                backgroundImage: `url(${videogame[0].img})`,
              }}
              className="containerImg"
            ></div>
            <div className="containerDescrip">
              <div className="containerTextDescrip">
               <h1 className="tittle">{videogame[0].name}</h1>
               <p>{videogame[0].platform ? videogame[0].platform : videogame[0].platforms} | {videogame[0].genres ? videogame[0].genres : videogame[0].Genres.map(e=> e.name).join(', ')} </p>
               <div className="descriptionText" ><p>{videogame[0].description}</p></div>
               <div className="ratingAndReleased">
                <span><img className="img" src={videogame.img} alt="" /> {videogame[0].rating}</span>
                <span> {videogame[0].released}</span>
               </div>
              </div>
            </div>
          </div>
        </div>
          </div>
      ) : <Loading/>}
    </div>
  );
}