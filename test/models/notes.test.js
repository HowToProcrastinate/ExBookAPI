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
            request(app)
                .post('/login')
                .send({
                    'email': user_global.email,
                    'password': user_global.password
                })
                .end((err, res) => {
                    user_global.token = 'bearer ' + res.body.token;
                    done();
                });
        });
    });
    it('shouldn\'t create notes without attributes', done => {
        let payload = {
            'title': '',
            'body': ''
        };
        request(app)
            .post('/notes')
            .send(payload)
            .set('Authorization', user_global.token)
            .end((err, res) => {
                expect(res.status).toBe(400);
                done();
            });
    });
    it('should append notes to one user', done => {
        let payload = {
            'title': 'Título',
            'body': 'Contenido'
        };
        request(app)
            .post('/notes')
            .send(payload)
            .set('Authorization', user_global.token)
            .end((err, res) => {
                expect(res.status).toBe(201);
                expect(res.body.id).toBeTruthy();
            });
        payload.title = 'Título 2';
        request(app)
            .post('/notes')
            .send(payload)
            .set('Authorization', user_global.token)
            .end((err, res) => {
                expect(res.status).toBe(201);
                expect(res.body.id).toBeTruthy();
                note_global = {
                    '_id': res.body.id,
                    'title': payload.title,
                    'body': payload.body
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
            .set('Authorization', user_global.token)
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
            .set('Authorization', user_global.token)
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
            .set('Authorization', user_global.token)
            .end((err, res) => {
                expect(res.status).toBe(400);
                done();
            });
    });
    it('should edit one note', done => {
        let updAttr = {
            'title': 'new title',
            'body': 'new body'
        };
        request(app)
            .patch(`/notes/${note_global._id}`)
            .send(updAttr)
            .set('Authorization', user_global.token)
            .end((err, res) => {
                expect(res.status).toBe(200);
                let body = res.body;
                expect(body.title).toBe(updAttr.title);
                expect(body.body).toBe(updAttr.body);
                done();
            });
    });
    it('should throw error when trying edit note that does not exists', done => {
        let updAttr = {
            'title': 'new title 3',
            'body': 'new body 3'
        };
        let wrongID = '5b142f34ab711c5889d58b7e';
        request(app)
            .patch(`/notes/${wrongID}`)
            .send(updAttr)
            .set('Authorization', user_global.token)
            .end((err, res) => {
                expect(res.status).toBe(400);
                done();
            });
    });
    it('should remove one note', done => {
        request(app)
            .delete(`/notes/${note_global._id}`)
            .set('Authorization', user_global.token)
            .end((err, res) => {
                expect(res.status).toBe(200);
                done();
            });
    });
    it('should throw error when trying remove note that does not exists', done => {
        let wrongID = '5b142f34ab711c5889d58b7e';
        request(app)
            .patch(`/notes/${wrongID}`)
            .set('Authorization', user_global.token)
            .end((err, res) => {
                expect(res.status).toBe(400);
                done();
            });
    });
});