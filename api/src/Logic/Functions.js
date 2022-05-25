require("dotenv").config();
const axios = require("axios");
const { API_KEYS } = process.env;
const { Recipe, Diet } = require("../db");
//ruta principal: imagen-nombre-temperamento-peso

module.exports = {
  apiRecipesname: async (name) => {
    //traigo todas las recetas de la api que contengan el name ingresado
    // ee655952b0ff471ab393e8a9b09c06ab
    // const api=await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=ee655952b0ff471ab393e8a9b09c06ab&query=${name}&number=1&addRecipeInformation=true`)
    const api = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${name}&number=100&addRecipeInformation=true&apiKey=${API_KEYS}`
    );
    console.log(api.data.results);
    const apiInfo = await api.data.results.map((e) => {
      const { title, image, diets, dishTypes, id, healthScore }= e;
      return { title, image, diets, dishTypes, id, healthScore };
    });
    return apiInfo;
  },

  apiRecipes: async () => {
    //traigo todas las recetas de la api
    const api = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${API_KEYS}`
    );
    const apiInfo = await api.data.results.map((e) => {
      const { title, image, diets, dishTypes, id, healthScore } = e;
      return { title, image, diets, dishTypes, id, healthScore };
    });
    return apiInfo;
  },

  dBRecipes: async () => {
    //traigo la info de mi base de datos
    return await Recipe.findAll({
      //obtengo de mi modelo Recipe todas las recetas creadas, donde incluya al modelo Diet, para que se realice la relacion y traiga la dieta al crear un personaje
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  },
  allRecipesAndName: async (name) => {
    //uno a todos las recetas (api/db)
    const apiInf = await module.exports.apiRecipesname(name.toLowerCase());
    const dBInf = await module.exports.dBRecipes();
    const dBInfname = await dBInf.filter((e) =>
      e.title.toLowerCase().includes(name.toLowerCase())
    );
    const allInfo = await apiInf.concat(dBInfname);
    return allInfo;
  },

  allRecipes: async () => {
    const apiInfo = await module.exports.apiRecipes();
    const dBInf = await module.exports.dBRecipes();
    const allInfo = apiInfo.concat(dBInf);
    return allInfo;
  },

  idRecipes: async (id) => {
    let aux = id.toString();
    // console.log(aux)
    if (aux.length > 15) {
      let dbinf = await module.exports.dBRecipes();
      // console.log(dbinf)
      let idDB = await dbinf.filter((e) => e.dataValues.id === aux);
      idDB = await idDB[0].dataValues;
      console.log(
        "esto es lo que envia al final",
        idDB.Diets.map((e) => e.dataValues.name)
      );
      const diets = await idDB.Diets.map((e) => e.dataValues.name);
      const { title, image, dishTypes, summary, healthScore, steps, createdInDB } = idDB;
      return { title, image, diets, dishTypes, summary, healthScore, steps, createdInDB };
    } else {
      console.log("esto se mi id: ", id);
      const apiID = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEYS}`
      );
      console.log("esto llega del error: ", apiID.data);
      const {
        title,
        image,
        diets,
        dishTypes,
        summary,
        healthScore,
        analyzedInstructions,
        createdInDB
      } = await apiID.data;
      let steps =
        analyzedInstructions.length !== 0
          ? analyzedInstructions[0].steps.map((e) => e.step)
          : "";
      steps !== "" && (await steps.join(". "));
      return { title, image, diets, dishTypes, summary, healthScore, steps, createdInDB};
    }
  },
  uploadDietsToDataBase: async () => {
    let dietstypes = [
      "gluten free",
      "ketogenic",
      "vegetarian",
      "lacto vegetarian",
      "ovo vegetarian",
      "vegan",
      "pescatarian",
      "paleolithic",
      "primal",
      "fodmap friendly",
      "whole 30",
    ];
    dietstypes.forEach((e) => {
      Diet.findOrCreate({
        where: { name: e }, //por cada tipo de dieta
      });
    });
  },
  typesdiets: async () => {
    const diets = await Diet.findAll({
      attributes: ["name"],
    });
    return diets;
  },
};
