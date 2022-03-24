const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false
    },
    spoonacularScore: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    steps: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false
    },
    createdInDB:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true,
    }
  });
};
