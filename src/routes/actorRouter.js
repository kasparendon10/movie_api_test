const express = require('express');
const router = express.Router();
const actorController = require('../controllers/actorController');

// Rutas para los actores
router.get('/actors', actorController.getAllActors);
router.post('/actors', actorController.createActor);
router.get('/actors/:id', actorController.getActorById);
router.put('/actors/:id', actorController.updateActorById);
router.delete('/actors/:id', actorController.deleteActorById);

module.exports = router;
