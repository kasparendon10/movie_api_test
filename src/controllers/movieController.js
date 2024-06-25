const { Movie } = require('../models');

// Obtener todas las películas
exports.getAllMovies = async (req, res, next) => {
    try {
        const movies = await Movie.findAll();
        res.json(movies);
    } catch (error) {
        next(error);
    }
};

// Crear una nueva película
exports.createMovie = async (req, res, next) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json(movie);
    } catch (error) {
        next(error);
    }
};

// Obtener una película por ID
exports.getMovieById = async (req, res, next) => {
    try {
        const movie = await Movie.findByPk(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
        next(error);
    }
};

// Actualizar una película por ID
exports.updateMovieById = async (req, res, next) => {
    try {
        const movie = await Movie.findByPk(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        await movie.update(req.body);
        res.json(movie);
    } catch (error) {
        next(error);
    }
}