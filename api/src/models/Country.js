const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo

// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id: {
      type: DataTypes.STRING(3),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    image: {
      type:DataTypes.STRING,                
    },
    region: {
      type: DataTypes.STRING,
      allowNull: true,     
    },
    capital: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    subregion: {
      type: DataTypes.STRING,
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: true,      
    },
    population: {
      type: DataTypes.INTEGER,
    },
  },
    {
      timestamps: false 
    }
  );
};