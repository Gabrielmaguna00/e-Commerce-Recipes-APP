const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const logic= require('../Logic/Functions.js')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', async (req, res)=>{
    try {
        let name=req.query.name
        if (name) {
            const recipes=await logic.allRecipesAndName(name.toLowerCase())
            console.log('estoy en la ruta',recipes.length)
            recipes.length!==0? res.status(200).send(recipes): res.status(404).send('No se encontro ninguna receta con el nombre solicitado!')  
        } else {
            const recipes=await logic.allRecipes();  
            res.status(200).send(recipes)
        }    
    }  
    catch (error) {
        console.log(error)
        res.status(404).send('error')
    }
})
router.get ('/:id', async (req, res)=>{
    try {  
        let id=req.params.id
        console.log(id)
        const recipeID=await logic.idRecipes(id)
        if (recipeID) {
            res.status(200).send(recipeID)
        } else {
            res.status(200).send('no se encontro la receta con ID ingresado')
        }
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }

//     Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
//     [ ] Resumen del plato
//     [ ] Puntuación
//     [ ] Nivel de "comida saludable"
//     [ ] Paso a paso

})

module.exports = router;
