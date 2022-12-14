


const initialState = {
    allvideogames : [],
    videogames : [],
    videogame : {},
    videogameDetails:[],
    platforms : [],
    genres : [],
    
}


function rootReducer (state=initialState, action){
switch (action.type) {
        
    case "GET_VIDEOGAMES":
        return{
            ...state,
            videogames:action.payload,
            allvideogames:action.payload,
            }
  
    case "GET_ALL_GENRES":
        return {
            ...state,
            genres: action.payload
            }

    case "FILTER_BY_GENRE":

        if (action.payload === "all"){
        
        return{
            ...state,
            videogames: state.allvideogames
            }

        }else{

        state.videogames = state.allvideogames.filter(videogames => videogames.genres?.includes(action.payload))
           
        return {
            ...state,
            videogames: state.videogames
        }
            }
            
    case "FILTER_BY_RATING":
            let sorted = action.payload === "down" ?
                state.allvideogames.sort((a, b) => {
                    if (a.rating > b.rating) {
                        return 1;
                    }
                    if (a.rating < b.rating) {
                        return -1;
                    }
                    return 0;
                }) :
                state.allvideogames.sort((a, b) => {
                    if (a.rating > b.rating) {
                        return -1;
                    }
                    if (a.rating < b.rating) {
                        return 1;
                    }
                    return 0;
                });
                

            return {
                ...state,
                videogames: sorted
            }

    case "FILTER_BY_ABC":
            let abcsorted = action.payload === 'A - Z' ?
            state.allvideogames.sort(( a, b ) => {
                if(a.name > b.name) {
                    return 1;
                }
                if(a.name < b.name) {
                    return -1;
                }
                return 0;
            }) :
            state.allvideogames.sort(( a, b ) => {
                if(a.name > b.name) {
                    return -1;
                }
                if(a.name < b.name) {
                    return 1;
                }
                return 0;
            })
            return{
                ...state,
                videogames : abcsorted
            }

    case "FILTER_BY_CREATED":

                const filteredBySource = action.payload === "db" ?
                state.allvideogames.filter(e => e.createInDb) 
                : state.allvideogames.filter( e => !e.createInDb)
                return{
                    ...state,
                    videogames: filteredBySource,
            }

    case "GET_VIDEOGAME_BY_NAME":

    // let name = action.payload === '' ? state.allvideogames : state.allvideogames.filter(e => e.name.toLowerCase().includes(action.payload.toLowerCase()))
    
        return{
            ...state,
            videogames: action.payload
            }

    case "GET_DETAILS":
            return{
                ...state,
                videogameDetails: action.payload,
            }

    case 'GET_ALL_PLATFORMS':
            return{
                ...state,
                platforms : [...state.platforms, ...action.payload]
            }

    default:
        return state;
}



}


export default rootReducer;