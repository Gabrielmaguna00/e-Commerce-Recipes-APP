const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Diet, Recipe} = require('../db')
const logic= require('../Logic/Functions')
const router = Router();

router.delete('/:id', async (req, res)=>{
    let ide=req.params.id
    try {
        let deleteRecipe= await Recipe.destroy({
            where: {id:ide}
        })
        res.status(200).send('se elimino con exito la receta!')
    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = router