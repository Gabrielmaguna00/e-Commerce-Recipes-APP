const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const logic = require("../Logic/Functions");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res) => {
  try {
    logic.uploadDietsToDataBase()
    const diets = await logic.typesdiets();
    res.status(200).send(diets);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
