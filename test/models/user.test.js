const request = require('supertest');
const faker = require('faker');
const app = require('../../src/index');

faker.locale = 'es_MX';

describe('Model: User', () => {
    // Build
    let email = faker.internet.email();
    it('should regiter users', done => {
        let user = {
            name: faker.name.findName(),
            email,
            password: faker.internet.password()
        }
        request(app)
            .post('/register')
            .send(user)
            .end((err, res) => {
                expect(res.status).toBe(201);
                done();
            });
    });
    it('shouldn\'t regiter user with duplicate email', done => {
        let user = {
            name: faker.name.findName(),
            email,
            password: faker.internet.password()
        }
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
            }
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
            }
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
            }
            request(app)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    expect(res.status).toBe(400);
                    done();
                });
        });
    });
});





// Build
// Test use cases
// Cover altern flows


// http://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/