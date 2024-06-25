const { Director } = require('../models');

// Obtener los directores
exports.getAllDirectors = async (req, res, next) => {
    try {
        const directors = await Director.findAll();
        res.json(directors);
    } catch (error) {
        next(error);
    }
};

// Crear un director
exports.createDirector = async (req, res, next) => {
    try {
        const director = await Director.create(req.body);
        res.status(201).json(director);
    } catch (error) {
        next(error);
    }
};

// Obtener un director por ID
exports.getDirectorById = async (req, res, next) => {
    try {
        const director = await Director.findByPk(req.params.id);
        if (!director) {
            return res.status(404).json({ error: 'Director not found' });
        }
        res.json(director);
    } catch (error) {
        next(error);
    }
};

// Actualizar un director por ID
exports.updateDirectorById = async (req, res, next) => {
    try {
        const director = await Director.findByPk(req.params.id);
        if (!director) {
            return res.status(404).json({ error: 'Director not found' });
        }
        await director.update(req.body);
        res.json(director);
    } catch (error) {
        next(error);
    }
};

// Eliminar un director por ID
exports.deleteDirectorById = async (req, res, next) => {
    try {
        const director = await Director.findByPk(req.params.id);
        if (!director) {
            return res.status(404).json({ error: 'Director not found' });
        }
        await director.destroy();
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
