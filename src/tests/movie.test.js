const request = require('supertest');
const app = require('../app');
const { Movie, Genre, Actor, Director, sequelize } = require('../models');

// Sincroniza y reinicia  la base de datos antes de todas las pruebas
beforeAll(async () => {
    await sequelize.sync({ force: true }); 
});

// Limpia la tabla despues de cada prueba
afterEach(async () => {
    await Movie.destroy({ where: {} }); 
});

// Cierra la conexion con la base de datos despues de todas las pruebas
afterAll(async () => {
    await sequelize.close(); 
});

describe('Movies API', () => {
    let movie;

    beforeEach(async () => {
        // Crea un ejemplo antes de cada prueba
        movie = await Movie.create({
            name: 'Rápidos y Furiosos 5',
            image: 'https://upload.wikimedia.org/wikipedia/en/4/4d/Fast_Five_poster.jpg',
            synopsis: 'Dominic Toretto y su equipo de corredores callejeros planean un ambicioso robo en Río de Janeiro mientras son perseguidos por un implacable agente federal',
            releaseYear: 2011
        });
    });

    test('GET /movies', async () => {
        const response = await request(app).get('/movies');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].name).toBe('Rápidos y Furiosos 5');
    });

    test('POST /movies', async () => {
        const newMovie = {
            name: 'Oppenheimer',
            image: 'https://upload.wikimedia.org/wikipedia/en/0/09/Oppenheimer_film_poster.jpg',
            synopsis: 'Un biopic que narra la vida del físico teórico J. Robert Oppenheimer, conocido por su papel en el desarrollo de la bomba atómica durante la Segunda Guerra Mundial.',
            releaseYear: 2023
        };
        const response = await request(app).post('/movies').send(newMovie);
        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Oppenheimer');
    });

    test('GET /movies/:id', async () => {
        const response = await request(app).get(`/movies/${movie.id}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Rápidos y Furiosos 5');
    });

    test('PUT /movies/:id', async () => {
        const updatedData = { name: 'Película Actualizada' };
        const response = await request(app).put(`/movies/${movie.id}`).send(updatedData);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Película Actualizada');
    });

    test('DELETE /movies/:id', async () => {
        const response = await request(app).delete(`/movies/${movie.id}`);
        expect(response.status).toBe(204);
    });

    test('POST /movies/:id/actors', async () => {
        const actor = await Actor.create({
            firstName: 'Vin',
            lastName: 'Diesel',
            nationality: 'estadounidense',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Vin_Diesel_%2835249382896%29.jpg/800px-Vin_Diesel_%2835249382896%29.jpg',
            birthday: '1967-07-18'
        });
        const response = await request(app).post(`/movies/${movie.id}/actors`).send({ actors: [actor.id] });
        expect(response.status).toBe(200);
        const movieActors = await movie.getActors();
        expect(movieActors).toHaveLength(1);
        expect(movieActors[0].firstName).toBe('Vin');
    });

    test('POST /movies/:id/directors', async () => {
        const director = await Director.create({
            firstName: 'Justin',
            lastName: 'Lin',
            nationality: 'chino',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Justin_Lin_2016.jpg/800px-Justin_Lin_2016.jpg',
            birthday: '1971-10-11'
        });
        const response = await request(app).post(`/movies/${movie.id}/directors`).send({ directors: [director.id] });
        expect(response.status).toBe(200);
        const movieDirectors = await movie.getDirectors();
        expect(movieDirectors).toHaveLength(1);
        expect(movieDirectors[0].firstName).toBe('Justin');
    });

    test('POST /movies/:id/genres', async () => {
        const genre = await Genre.create({ name: 'Género de Prueba' });
        const response = await request(app).post(`/movies/${movie.id}/genres`).send({ genres: [genre.id] });
        expect(response.status).toBe(200);
        const movieGenres = await movie.getGenres();
        expect(movieGenres).toHaveLength(1);
        expect(movieGenres[0].name).toBe('Género de Prueba');
    });
});
