const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const routes = require('./routes/index');

const app = express();
app.use(bodyParser.json());

app.use('/', routes);

app.get('/', (req, res) => {
    res.send('Welcome to the Movie API');
});

// CRUD para Genres
app.post('/genres', async (req, res) => {
    try {
        const genre = await Genre.create(req.body);
        res.status(201).json(genre);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/genres', async (req, res) => {
    const genres = await Genre.findAll();
    res.json(genres);
});

app.get('/genres/:id', async (req, res) => {
    const genre = await Genre.findByPk(req.params.id);
    if (genre) {
        res.json(genre);
    } else {
        res.status(404).json({ error: 'Genre not found' });
    }
});

app.put('/genres/:id', async (req, res) => {
    const genre = await Genre.findByPk(req.params.id);
    if (genre) {
        await genre.update(req.body);
        res.json(genre);
    } else {
        res.status(404).json({ error: 'Genre not found' });
    }
});

app.delete('/genres/:id', async (req, res) => {
    const genre = await Genre.findByPk(req.params.id);
    if (genre) {
        await genre.destroy();
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Genre not found' });
    }
});

// GET /películas con géneros, actores y directores
app.get('/movies', async (req, res) => {
    const movies = await Movie.findAll({
        include: [Genre, Actor, Director]
    });
    res.json(movies);
});

// POST -> /movies/:id/genres
app.post('/movies/:id/genres', async (req, res) => {
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
});sequelize.sync({ force: true }).then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});

module.exports = app;
