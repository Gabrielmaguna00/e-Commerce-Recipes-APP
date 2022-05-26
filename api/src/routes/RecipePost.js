const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Diet, Recipe} = require('../db')
const logic= require('../Logic/Functions')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.post('/', async (req, res)=>{
try {
    let {title, summary, healthScore, steps, image, diets}=req.body
    image?image=image:image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTplLkZuWHYGRvGcCPKdFOadvidGK1xnm9FUw&usqp=CAU'
    let addRecipe = await Recipe.create({title, summary, image, healthScore, steps})
    let dietDB = await Diet.findAll({
        where: {name : diets}
    })
    await addRecipe.addDiet(dietDB)
    res.status(200).send('creado con exito!')
}  
 catch (error) {
    console.log(error)
    res.status(404).send(error)
}
})    

module.exports = router;