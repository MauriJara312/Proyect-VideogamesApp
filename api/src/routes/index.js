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
    const apiUrl3= await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=3`);
    const apiUrl4= await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=4`);
    const apiUrl5= await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=5`);



    const allinfo = [...apiUrl.data.results , ...apiUrl2.data.results, ...apiUrl3.data.results, ...apiUrl4.data.results, ...apiUrl5.data.results]

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

router.post("/videogame", async ( req , res )=>{
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

    genres?.forEach ( async e => {
      let eachGenre = await Genre.findOne({
            where: { name: e}
        })

        await videogameCreated.addGenre(eachGenre)

    });

    res.send(console.log("Videogame Created"))


}catch(error){
    throw error
}
   
});

router.get("/videogame/:id", async ( req, res ) => {
    const {id} = req.params;
   
    if(id.length > 9){
      let dbGameInfo = await Videogame.findOne({
        where:{ id: id},
        include: Genre
      })
    
      let gameDb ={
        image: dbGameInfo.image,
        name: dbGameInfo.name,
        released: dbGameInfo.released,
        rating: dbGameInfo.rating,
        platforms: dbGameInfo.platforms,
        genres: dbGameInfo.genres?.map(e => e.name),
        description: dbGameInfo.description

      }
      res.send(gameDb)
      
    }

    else{
      const videoGameInfoId = await axios.get(`https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`);
      let gameDetail ={
        image: videoGameInfoId.data.background_image,
        name: videoGameInfoId.data.name,
        released: videoGameInfoId.data.released,
        rating: videoGameInfoId.data.rating,
        platforms: videoGameInfoId.data.platforms.map(e => e.platform.name),
        genres: videoGameInfoId.data.genres.map(e => e.name),
        description: videoGameInfoId.data.description,
        website: videoGameInfoId.data.website,
      }
        res.status(200).json(gameDetail)
        
    }
})

router.get('/platforms', async (req, res)=> {
    const allplatforms = await axios.get(`https://api.rawg.io/api/platforms?key=${YOUR_API_KEY}`)
    const apiPlatf = await allplatforms.data.results.map(el => el.name)
    res.status(200).send(apiPlatf)
})   



//pruebas

//actualizar por id

// router.put('/:id',async(req,res) => {

//     const { name } = req.body;
//     const id = req.params.id; 

//     try {                                  
//        const updated = await Videogame.update({name},{
//            where: { id: id },
//        })
//        res.status(201).send(updated);
//     } catch (error) {
//         throw error
//     }
// })

// eliminar por id

// router.delete('/:id',async(req,res) => {

//    const { id } = req.params
//        try {
//            const destroyedVideogame = await Videogame.destroy({where: {id: id}})
//            res.send(200)
//         } catch (error) {
//             throw error
//         }
   
// })


module.exports = router;
