const Sequelize = require('sequelize');
const sequelize = require('../utils/connection');

const Genre = require('./Genre');
const Actor = require('./Actor');
const Director = require('./Director');
const Movie = require('./Movie');

// Inicia los modelos
Genre.init({}, { sequelize, modelName: 'Genre' });
Actor.init({}, { sequelize, modelName: 'Actor' });
Director.init({}, { sequelize, modelName: 'Director' });
Movie.init({}, { sequelize, modelName: 'Movie' });

// Define las relaciones
Movie.belongsToMany(Genre, { through: 'MovieGenres' });
Genre.belongsToMany(Movie, { through: 'MovieGenres' });

Movie.belongsToMany(Actor, { through: 'MovieActors' });
Actor.belongsToMany(Movie, { through: 'MovieActors' });

Movie.belongsToMany(Director, { through: 'MovieDirectors' });
Director.belongsToMany(Movie, { through: 'MovieDirectors' });

module.exports = {
    sequelize,
    Genre,
    Actor,
    Director,
    Movie
};

