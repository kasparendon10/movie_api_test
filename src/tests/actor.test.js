const request = require('supertest');
const app = require('../app');
const { Actor } = require('../models');

describe('Actors API', () => {
    let actor;

    beforeEach(async () => {
        await Actor.destroy({ where: {} });
        actor = await Actor.create({
            firstName: 'Vin',
            lastName: 'Diesel',
            nationality: 'estadounidense',
            image: '1967',
            birthday: '1967-07-18'
        });
    });

    afterEach(async () => {
        await Actor.destroy({ where: {} });
    });

    test('GET /actors', async () => {
        const response = await request(app).get('/actors');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].firstName).toBe('Vin');
    });

    test('POST /actors', async () => {
        const newActor = {
            firstName: 'Cillian',
            lastName: 'Murphy',
            nationality: 'irlandes',
            image: '',
            birthday: '1976-05-25'
        };
        const response = await request(app).post('/actors').send(newActor);
        expect(response.status).toBe(201);
        expect(response.body.firstName).toBe('Cillian');
    });

    test('GET /actors/:id', async () => {
        const response = await request(app).get(`/actors/${actor.id}`);
        expect(response.status).toBe(200);
        expect(response.body.firstName).toBe('Vin');
    });

    test('PUT /actors/:id', async () => {
        const updatedData = { firstName: 'Updated' };
        const response = await request(app).put(`/actors/${actor.id}`).send(updatedData);
        expect(response.status).toBe(200);
        expect(response.body.firstName).toBe('Updated');
    });

    test('DELETE /actors/:id', async () => {
        const response = await request(app).delete(`/actors/${actor.id}`);
        expect(response.status).toBe(204);
    });
});
