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
    let note_global = '';
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
                expect(res.body.id).toBeTruthy();
            });
        payload.note.title = 'Título 2';
        request(app)
            .post('/notes')
            .send(payload)
            .end((err, res) => {
                expect(res.status).toBe(201);
                expect(res.body.id).toBeTruthy();
                note_global = {
                    '_id': res.body.id,
                    'title': payload.note.title,
                    'body': payload.note.body
                };
                done();
            });
    });
    it('should get all notes from une user', done => {
        let expected = [
            {
                'title': 'Título',
                'body': 'Contenido'
            },{
                'title': 'Título',
                'body': 'Contenido'
            }
        ];
        request(app)
            .get('/notes')
            .send({
                'email': user_global.email
            })
            .end((err, res) => {
                let body = res.body;
                let cBody = body.map(note => {
                    return {
                        'title': note.title,
                        'body': note.body
                    };
                });
                expect(res.status).toBe(200);
                expect(cBody).toEqual(expect.arrayContaining(expected));
                done();
            });
    });
    it('should get one note by id', done => {
        request(app)
            .get(`/notes/${note_global._id}`)
            .send({
                'email': user_global.email
            })
            .end((err, res) => {
                let body = res.body;
                expect(res.status).toBe(200);
                expect(body).toEqual(expect.objectContaining(note_global));
                done();
            });
    });
    it('should give error response on not found note', done => {
        let id = note_global._id.split('').sort().join('');
        request(app)
            .get(`/notes/${id}`)
            .send({
                'email': user_global.email
            })
            .end((err, res) => {
                expect(res.status).toBe(400);
                done();
            });
    });
});