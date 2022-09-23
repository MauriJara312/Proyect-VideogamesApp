import axios from "axios";

export function getVideogames (){

    return async function(dispatch){
        var json = await axios.get ("http://localhost:3001/videogames")
        
        return dispatch({
            type: "GET_VIDEOGAMES",
            payload: json.data,
            })
    }
};

export function getAllGenres() {
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/genres`);
        return dispatch({
            type: 'GET_ALL_GENRES',
            payload: json.data
        })
    }
}

export function videogameFilterByGenre(payload){
        return{
            type: "FILTER_BY_GENRE",
            payload
        }

}

export function filterByAbc(payload) {
    return {
        type: 'FILTER_BY_ABC',
        payload
    }
}

export function filterByRating(payload) {
    return {
        type: 'FILTER_BY_RATING',
        payload
    }
}

export function filterByCreated(payload){
    return{
        type: "FILTER_BY_CREATED",
        payload: payload
    }
}