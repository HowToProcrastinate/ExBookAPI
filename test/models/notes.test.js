const request = require('supertest');
const faker = require('faker');
const app = require('../../src/index');
const User = require('../../src/models/users');

faker.locale = 'es_MX';

describe('Model: Note', () => {
    let user_global = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    };
    beforeAll(done => {
        let user = new User(user_global);
        user.save(() => {
            done();
        });
    });
    afterAll(done => {
        User.remove({}, () => {
            done();
        });
    });
    it('shouldn\'t create notes without attributes', done => {
        let payload = {
            'email': user_global.email,
            'note': {
                'title': '',
                'body': ''
            }
        };
        request(app)
            .post('/notes')
            .send(payload)
            .end((err, res) => {
                expect(res.status).toBe(400);
                done();
            });
    });
    it('should append notes to one user', done => {
        let payload = {
            'email': user_global.email,
            'note': {
                'title': 'Título',
                'body': 'Contenido'
            }
        };
        request(app)
            .post('/notes')
            .send(payload)
            .end((err, res) => {
                expect(res.status).toBe(201);
            });
        request(app)
            .post('/notes')
            .send(payload)
            .end((err, res) => {
                expect(res.status).toBe(201);
                done();
            });
    });
});