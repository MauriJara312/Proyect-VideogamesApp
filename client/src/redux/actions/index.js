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

export function filterByGenre(payload){
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

export function getVideogameByName(name){
    return async function(dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            return dispatch({
                type: "GET_VIDEOGAME_BY_NAME",
                payload: json.data,
            })
        } catch(error){
            console.log(error)
        }
    }

    // try{
    //     return{
    //         type: "GET_VIDEOGAME_BY_NAME",
    //         payload : name
    //         }
    //     }catch(error){
    //         console.log(error)
    //     }


}

export function postVideoGame(payload){
    return async function () {
        const createPost = await axios.post('http://localhost:3001/videogame/', payload);
        console.log(createPost);
        return createPost;
    }
}

export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/videogame/${id}`)
            return dispatch({
                type: "GET_DETAILS",
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}

export function getAllPlatforms(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/platforms')

        return dispatch({
            type: 'GET_ALL_PLATFORMS',
            payload: json.data  
        })
    }
}