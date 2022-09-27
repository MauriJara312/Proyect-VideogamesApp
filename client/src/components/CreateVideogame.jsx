import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {postVideoGame , getAllGenres, getAllPlatforms} from "../redux/actions/index"
import {useDispatch, useSelector} from "react-redux";
import "./Styles/CreateVideogame.css"


export default function CreateVideogame () {
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector((state) => state.genres);
    const platforms = useSelector((state) => state.platforms);
    const [error, setError] = useState({});
  
    const [input, setInput] = useState({
      name: "",
      description: "",
      rating: "",
      released: "",
      image: "",
      platforms: [],
      genres: [],
    });

    

    useEffect(() => {
      dispatch(getAllGenres());
      dispatch(getAllPlatforms());
    }, [dispatch]);

// console.log(input)
  // console.log(platforms)
    
  
    function validate(input) {
      let error = {};
  
      if (!input.name) {
        error.name = "Name is required";
      } else if (input.name.length > 50) {
        error.name = "Name is too long";
      }
  
      if (!input.description) {
        error.description = "Description is required ";
      } else if (input.description.length > 1500) {
        error.description = "Description is too long. (Max = 1500 characters)";
      }
  
      if (!input.rating) {
        error.rating = "Rating is required";
      } else if (input.rating > 5 || input.rating < 0) {
        error.rating = "Rating must range between 0 to 5";
      }
  
      if (!input.released) {
        error.released = "Date of release is required";
      } else if (input.released.length < 10) {
        error.released = "Date of release is to long";
      }
      if (!input.image) {
        error.image = "Image URL is required";
      }
  
      if (!input.genres[0]) {
        error.genres = "Minimun one Genre is required ";
      }
  
      if (!input.platforms[0]) {
        error.platforms = "Minimun one Platform is required";
      }
  
      return error;
    }
  
    function handleOnChange(e) {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });

      console.log(input)

      setError(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
  
    }
  
    function handleSelectGenres(e) {
      // let filt = input.genres.filter(e=> e === e.target.name)
      // console.log(filt)
  
      if (!input.genres.includes(e.target.value)) {
        setInput({
          ...input,
          genres: [...input.genres, e.target.value],
        });
        setError(
          validate({
            ...input,
            genres: [...input.genres, e.target.value],
          })
        );
      } else {
        setInput({
          ...input,
        });
      }
    }
  
    function handleSelectPlatform(e) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      });
      setError(
        validate({
          ...input,
          platforms: [...input.platforms, e.target.value],
        })
      );
    }
  
    function handleDeletePlatforms(el) {
      setInput({
        ...input,
        platforms: input.platforms.filter((param) => param !== el),
      });
    }
  
    function handleDeleteGenres(el) {
      setInput({
        ...input,
        genres: input.genres.filter((param) => param !== el),
      });
    }
  
    function handleSubmit(e) {
      e.preventDefault();
  
      let create = {
        name: input.name,
        description: input.description,
        rating: input.rating,
        released: input.released,
        image: input.image,
        platforms: input.platforms.join(", "),
        genres: input.genres.join(", "),
      };
  
      dispatch(postVideoGame(create));
  
      setInput({
        name: "",
        description: "",
        rating: "",
        released: "",
        image: "",
        platforms: [],
        genres: [],
      });
  
      alert("VideoGame Created");
      history.push("/home");
    };
  
    return (

      <div className="containerPadre">


        <div className="subContainer">
        <Link className="link" to="/home">HOME</Link>
  
          <div className="firstContainerForm">
  
          <div className="containerForm">
  
          <h1 className="title">Add your videogame</h1>
          <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <div>
              <p className="subtitle">Name:</p>
              <input
              className="Input"
                type="text"
                value={input.name}
                name="name"
                onChange={handleOnChange}
              />
              {error.name && <span className="red">{error.name}</span>}
            </div>
  
  
            <div>
              <p className="subtitle">Released:</p>
              <input
               className="Input"
                type="date"
                value={input.released}
                name="released"
                onChange={handleOnChange}
              />
              {error.released && <span className="red">{error.released}</span>}
            </div>
  
            <div>
              <p className="subtitle">ImageUrl:</p>
              <input
               className="Input"
                type="text"
                value={input.image}
                name="image"
                onChange={handleOnChange}
              />
              {error.image && <span className="red">{error.image}</span>}
            </div>
  
            <div>
              <p className="subtitle">Rating:</p>
              <input
               className="Input"
                type="number"
                value={input.rating}
                name="rating"
                onChange={handleOnChange}
              />
              {error.rating && <span className="red">{error.rating}</span>}
            </div>
            <div>
              <p className="subtitle">Genres</p>
              <select  className="Input" onChange={(e) => handleSelectGenres(e)}>
                <option value="all">All</option>
                {genres?.map((e) => {
                  return (
                    <option key={e.id} value={e.name}>
                      {e.name}
                    </option>
                  );
                })}
              </select>
              {error.genres && <span className="red">{error.genres}</span>}
            </div>
            <div className="selected">
              {input.genres?.map((e) => {
                return (
                  <>
                    <div>{e}</div>
                    <button onClick={() => handleDeleteGenres(e)}>X</button>
                  </>
                );
              })}{" "}
            </div>
            <div>
              <p className="subtitle">Platforms</p>
              <select  className="Input" onChange={(e) => handleSelectPlatform(e)}>
                <option value="all">All</option>
                {platforms?.map((e) => {
                  return (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  );
                })}
              </select>
              {error.platforms && (
                <span className="red">{error.platforms}</span>
              )}
            </div>
            <div className="selected">
              {input.platforms?.map((e) => {
                return (
                  <>
                    <div>{e}</div>
                    <button onClick={() => handleDeletePlatforms(e)}>X</button>
                  </>
                );
              })}
            </div>
            <div>
              <p className="subtitle">Description:</p>
              <textarea
                className="textArea"
                type="text"
                value={input.description}
                name="description"
                onChange={handleOnChange}
              />
              {error.description && (
                <span className="red">{error.description}</span>
              )}
            </div>
            {Object.keys(error).length ? (
              <div>
                <input type="submit" disabled name="Send" />
              </div>
            ) : (
              <div>
                <input type="submit" name="Send" />
              </div>
            )}
          </form>
          </div>
          </div>
        </div>
          <div></div>
      </div>
    );
  }
