const request = require('supertest');
const app = require('../app');
const { Director } = require('../models');

describe('Directors API', () => {
    let director;

    beforeEach(async () => {
        await Director.destroy({ where: {} });
        director = await Director.create({
            firstName: 'Christopher',
            lastName: 'Nolan',
            nationality: 'Britanico',
            image: '',
            birthday: '1970-07-30'
        });
    });

    afterEach(async () => {
        await Director.destroy({ where: {} });
    });

    test('GET /directors', async () => {
        const response = await request(app).get('/directors');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].firstName).toBe('Christopher');
    });

    test('POST /directors', async () => {
        const newDirector = {
            firstName: 'Quentin',
            lastName: 'Tarantino',
            nationality: 'estadounidense',
            image: '',
            birthday: '1963-03-27'
        };
        const response = await request(app).post('/directors').send(newDirector);
        expect(response.status).toBe(201);
        expect(response.body.firstName).toBe('Quentin');
    });

    test('GET /directors/:id', async () => {
        const response = await request(app).get(`/directors/${director.id}`);
        expect(response.status).toBe(200);
        expect(response.body.firstName).toBe('Christopher');
    });

    test('PUT /directors/:id', async () => {
        const updatedData = { firstName: 'Updated' };
        const response = await request(app).put(`/directors/${director.id}`).send(updatedData);
        expect(response.status).toBe(200);
        expect(response.body.firstName).toBe('Updated');
    });

    test('DELETE /directors/:id', async () => {
        const response = await request(app).delete(`/directors/${director.id}`);
        expect(response.status).toBe(204);
    });
});

