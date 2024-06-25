const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');

// Rutas para los géneros
router.get('/genres', genreController.getAllGenres);
router.post('/genres', genreController.createGenre);
router.get('/genres/:id', genreController.getGenreById);
router.put('/genres/:id', genreController.updateGenreById);
router.delete('/genres/:id', genreController.deleteGenreById);

module.exports = router;
