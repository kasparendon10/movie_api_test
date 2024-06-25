const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Rutas para las películas
router.get('/movies', movieController.getAllMovies);
router.post('/movies', movieController.createMovie);
router.get('/movies/:id', movieController.getMovieById);
router.put('/movies/:id', movieController.updateMovieById);
router.delete('/movies/:id', movieController.deleteMovieById);

module.exports = router;
