const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ("axios");
const { Videogame, Genre } = require ('../db.js');
const {YOUR_API_KEY} = process.env;

const router = Router();
// 
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const getApiInf = async () => {

    const apiUrl= await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`);
    const apiUrl2= await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=2`);
    const allinfo = await [...apiUrl.data.results , ...apiUrl2.data.results]

    const allinfoo= allinfo.map(el => {
        return {
            id : el.id,
            name : el.name,
            image : el.background_image,
            released:el.released,
            rating:el.rating,
            description: el.description,
            genres: el.genres.map( el => el.name),
            platforms:el.platforms.map(el => el),
        }
    })
    return allinfoo;
};

const getDbInf = async () => {
    return await Videogame.findAll({
        include:{
            model: Genre,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    })
}

const getAllInf = async () => {
    const apiInf = await getApiInf();
    const dbInf =await getDbInf();

    const allInf = await apiInf.concat(dbInf);

    return allInf;
}

router.get("/videogames", async (req,res)=>{
    const name = req.query.name;
    let allVideogames = await getAllInf();

    if(name){

        let videogameName = await allVideogames.filter( el => el.name.toLowerCase().includes(name.toLocaleLowerCase()));
        videogameName.length ? 
        res.status(200).send(videogameName) :
        res.status(404).send("Videogame not found.") 
    }else{
        res.status(200).send(allVideogames)
    }
})

router.get("/genres", async (req,res)=>{

    const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`);
    const genresApiInf =  genresApi.data.results.map(el => el.name)
    
    genresApiInf.forEach(el => {
        Genre.findOrCreate({
            where: { name: el}
        })
    })

    const allGenres = await Genre.findAll();

    res.send(allGenres);
})

router.post("/videogames", async ( req , res )=>{
try {
    let {
        name,
        image,
        description,
        released,
        rating,
        genres,
        platforms,
    } = req.body;

    let videogameCreated = await Videogame.create({
        name,
        image,
        description,
        released,
        rating,
        platforms,
    })

    genres.forEach ( async e => {
      let eachGenre = await Genre.findOne({
            where: { name: e}
        })

        await videogameCreated.addGenre(eachGenre)

    });

    res.send("Videogame Created")


}catch(error){
    throw error
}
   
});

router.get("/videogame/:id", async ( req, res ) => {
    const id = req.params.id;
    const allVideogames = await getAllInf()

    if (id){
        let videogameId = await allVideogames.filter(el => el.id == id )
    

        videogameId.length?
        res.status(200).json(videogameId):
        res.status(404).send("The videogame does not exists")
    }
    })

module.exports = router;
