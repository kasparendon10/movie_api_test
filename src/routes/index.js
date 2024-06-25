const express = require('express');
const router = express.Router();
const { Genre, Actor, Director, Movie } = require('../models');

// CRUD para Genres
router.post('/genres', async (req, res) => {
    try {
        const genre = await Genre.create(req.body);
        res.status(201).json(genre);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/genres', async (req, res) => {
    const genres = await Genre.findAll();
    res.json(genres);
});

router.get('/genres/:id', async (req, res) => {
    const genre = await Genre.findByPk(req.params.id);
    if (genre) {
        res.json(genre);
    } else {
        res.status(404).json({ error: 'Genre not found' });
    }
});

router.put('/genres/:id', async (req, res) => {
    const genre = await Genre.findByPk(req.params.id);
    if (genre) {
        await genre.update(req.body);
        res.json(genre);
    } else {
        res.status(404).json({ error: 'Genre not found' });
    }
});

router.delete('/genres/:id', async (req, res) => {
    const genre = await Genre.findByPk(req.params.id);
    if (genre) {
        await genre.destroy();
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Genre not found' });
    }
});

// GET /movies con géneros, actores y directores
router.get('/movies', async (req, res) => {
    const movies = await Movie.findAll({
        include: [Genre, Actor, Director]
    });
    res.json(movies);
});

// POST -> /movies/:id/genres
router.post('/movies/:id/genres', async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id);
        if (movie) {
            await movie.setGenres(req.body.genres);
            const genres = await movie.getGenres();
            res.json(genres);
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// POST -> /movies/:id/actors
router.post('/movies/:id/actors', async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id);
        if (movie) {
            await movie.setActors(req.body.actors);
            const actors = await movie.getActors();
            res.json(actors);
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// POST -> /movies/:id/directors
router.post('/movies/:id/directors', async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id);
        if (movie) {
            await movie.setDirectors(req.body.directors);
            const directors = await movie.getDirectors();
            res.json(directors);
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;

