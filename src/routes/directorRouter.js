const express = require('express');
const router = express.Router();
const directorController = require('../controllers/directorController');

// Rutas para  los directores
router.get('/directors', directorController.getAllDirectors);
router.post('/directors', directorController.createDirector);
router.get('/directors/:id', directorController.getDirectorById);
router.put('/directors/:id', directorController.updateDirectorById);
router.delete('/directors/:id', directorController.deleteDirectorById);

module.exports = router;
