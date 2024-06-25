const { Actor } = require('../models');

// Obtener los actores
exports.getAllActors = async (req, res, next) => {
    try {
        const actors = await Actor.findAll();
        res.json(actors);
    } catch (error) {
        next(error);
    }
};

// Crear un nuevo actor
exports.createActor = async (req, res, next) => {
    try {
        const actor = await Actor.create(req.body);
        res.status(201).json(actor);
    } catch (error) {
        next(error);
    }
};

// Obtener un actor por ID
exports.getActorById = async (req, res, next) => {
    try {
        const actor = await Actor.findByPk(req.params.id);
        if (!actor) {
            return res.status(404).json({ error: 'Actor not found' });
        }
        res.json(actor);
    } catch (error) {
        next(error);
    }
};

// Actualizar un actor por ID
exports.updateActorById = async (req, res, next) => {
    try {
        const actor = await Actor.findByPk(req.params.id);
        if (!actor) {
            return res.status(404).json({ error: 'Actor not found' });
        }
        await actor.update(req.body);
        res.json(actor);
    } catch (error) {
        next(error);
    }
};

// Eliminar un actor por ID
exports.deleteActorById = async (req, res, next) => {
    try {
        const actor = await Actor.findByPk(req.params.id);
        if (!actor) {
            return res.status(404).json({ error: 'Actor not found' });
        }
        await actor.destroy();
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
