const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ("axios");
const { Videogame, Genre } = require ('../db');


const router = Router();
// 
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInf = async () => {
    const apiUrl= await axios.get("https://api.rawg.io/api/games?key=1333f6ec622f4a38a30a8d8593c0719b");

    const apiInf= await apiUrl.data.results.map(el => {
        return {
            id : el.id,
            name : el.name,
            released:el.released,
            rating:el.rating,
            platforms:el.platforms.map(el => el),
        }
    })
    return apiInf;
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

    const genresApi = await axios.get("https://api.rawg.io/api/genres?key=1333f6ec622f4a38a30a8d8593c0719b");
    const genresApiInf =  genresApi.data.results.map(el => el.name)
    
    genresApiInf.forEach(el => {
        Genre.findOrCreate({
            where: { name: el}
        })
    })

    const allGenres = await Genre.findAll();

    res.send(allGenres);
})
module.exports = router;
