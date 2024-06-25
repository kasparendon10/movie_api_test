const request = require('supertest');
const app = require('../app');
const { Genre } = require('../models');

describe('Genres API', () => {
    let genre;

    beforeEach(async () => {
        await Genre.destroy({ where: {} });
        genre = await Genre.create({
            name: 'Acción'
        });
    });

    afterEach(async () => {
        await Genre.destroy({ where: {} });
    });

    test('GET /genres', async () => {
        const response = await request(app).get('/genres');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].name).toBe('Acción');
    });

    test('POST /genres', async () => {
        const newGenre = { name: 'Nuevo Género' };
        const response = await request(app).post('/genres').send(newGenre);
        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Nuevo Género');
    });

    test('GET /genres/:id', async () => {
        const response = await request(app).get(`/genres/${genre.id}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Acción');
    });

    test('PUT /genres/:id', async () => {
        const updatedData = { name: 'Género Actualizado' };
        const response = await request(app).put(`/genres/${genre.id}`).send(updatedData);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Género Actualizado');
    });

    test('DELETE /genres/:id', async () => {
        const response = await request(app).delete(`/genres/${genre.id}`);
        expect(response.status).toBe(204);
    });
});

