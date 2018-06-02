const request = require('supertest');
const faker = require('faker');
const app = require('../../src/index');
const User = require('../../src/models/users');

faker.locale = 'es_MX';

describe.only('Model: User', () => {
    afterAll(done => {
        User.remove({}, () => {
            done();
        });
    });
    let user_global = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        token: ''
    };
    it('should register users', done => {
        request(app)
            .post('/register')
            .send(user_global)
            .end((err, res) => {
                expect(res.status).toBe(201);
                done();
            });
    });
    it('shouldn\'t register user with duplicate email', done => {
        let user = {
            name: faker.name.findName(),
            email: user_global.email,
            password: faker.internet.password()
        };
        request(app)
            .post('/register')
            .send(user)
            .end((err, res) => {
                expect(res.status).toBe(400);
                done();
            });
    });
    describe('shouldn\'t register an user with incomplete attr', () => {
        it('without name', done => {
            let user = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            request(app)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    expect(res.status).toBe(400);
                    done();
                });
        });
        it('without email', done => {
            let user = {
                name: faker.name.findName(),
                password: faker.internet.password()
            };
            request(app)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    expect(res.status).toBe(400);
                    done();
                });
        });
        it('without password', done => {
            let user = {
                name: faker.name.findName(),
                email: faker.internet.email()
            };
            request(app)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    expect(res.status).toBe(400);
                    done();
                });
        });
    });
    it('should get token from login', done => {
        request(app)
            .get('/login')
            .send({
                'email': user_global.email,
                'password': user_global.password
            })
            .end((err, res) => {
                expect(res.status).toBe(200);
                expect(res.body.token).toBeTruthy();
                user_global.token = 'bearer ' + res.body.token;
                done();
            });
    });
    it('should retrieve all user information by token', done => {
        request(app)
            .get('/profile')
            .set('Authorization', user_global.token)
            .end((err, res) => {
                let body = res.body;
                expect(res.status).toBe(200);
                expect(body.name).toBe(user_global.name);
                expect(body.email).toBe(user_global.email);
                expect(body.password).toBe(user_global.password);
                done();
            });
    });
    it('should update user attributes', done => {
        let name = faker.name.findName();
        let password = faker.internet.password();
        let email = faker.internet.email();
        let user_new_attributes = {
            name,
            email,
            password
        };
        request(app)
            .patch('/profile')
            .send(user_new_attributes)
            .set('Authorization', user_global.token)
            .end((err, res) => {
                let body = res.body;
                expect(res.status).toBe(200);
                expect(body.name).toBe(name);
                expect(body.password).toBe(password);
                expect(body.email).toBe(email);
                done();
            });
    });
});