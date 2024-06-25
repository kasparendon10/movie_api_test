const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Movie = sequelize.define('Movie', {
  name: { 
    type: DataTypes.STRING,
    allowNull: false 
  },
  image: { 
    type: DataTypes.STRING 
  },
  synopsis: { 
    type: DataTypes.TEXT 
  },
  releaseYear: { 
    type: DataTypes.INTEGER 
  }
});

module.exports = Movie;

