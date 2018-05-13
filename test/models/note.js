const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const app = require('../../src/index');
const delay = 800;

chai.use(chaiHttp);

setTimeout(() => {
    describe('MODELO: note', () => {
        describe('MÉTODO: add', () => {
            it('No debería dejar crear una nota si no se pasa ningún attr', (done) => {
                let note = {};
                chai.request(app)
                    .post('/notes')
                    .send(note)
                    .end((err, res) => {
                        res.should.have.status(400);
                        done();
                    });
            });
            let insertedNote = '';
            afterEach((done) =>{
                chai.request(app)
                    .delete(`/notes/${insertedNote}`)
                    .end(() =>{
                        done();
                    });
            });
            it('Debería poder crear una nota pasándole sólo el `title`', (done) => {
                let note = {
                    'title': 'Título'
                };
                chai.request(app)
                    .post('/notes')
                    .send(note)
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.have.property('title', 'Título');
                        insertedNote = res.body._id;
                        done();
                    });
            });
            it('Debería poder crear una nota pasándole sólo el `body`', (done) => {
                let note = {
                    'body': 'body'
                };
                chai.request(app)
                    .post('/notes')
                    .send(note)
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.have.property('body', 'body');
                        insertedNote = res.body._id;
                        done();
                    });
            });
        });
        describe('MÉTODO: list', () => {
            let insertedNotes = [];
            before((done) => {
                for(let i = 0; i < 5; i++) {
                    chai.request(app)
                        .post('/notes')
                        .send({
                            'title': `Título ${i}`,
                            'body': `Cuerpo ${i}`
                        })
                        .end((err, res) => {
                            insertedNotes.push(res.body._id);
                        });
                }
                done();
            });
            after((done) =>{
                for(let id of insertedNotes) {
                    chai.request(app)
                        .delete(`/notes/${id}`)
                        .end(() => {
                            if(id === insertedNotes[insertedNotes.length - 1]) {
                                done();
                            }
                        });
                }
            });
            it('Debería listar todos los elementos', (done) => {
                chai.request(app)
                    .get('/notes')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.to.be.an('array');
                        res.body.should.not.be.empty;
                        done();
                    });
            });
        });
        describe('MÉTODO: get', () => {
            let insertedNote = '';
            before((done) => {
                chai.request(app)
                    .post('/notes')
                    .send({
                        'title': 'Título',
                        'body': 'Cuerpo'
                    })
                    .end((err, res) => {
                        insertedNote = res.body._id;
                        done();
                    });
            });
            after((done) => {
                chai.request(app)
                    .delete(`/notes/${insertedNote}`)
                    .end(() =>{
                        done();
                    });
            });
            it('Debería mostrar la información de una nota', (done) => {
                chai.request(app)
                    .get(`/notes/${insertedNote}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('title', 'Título');
                        res.body.should.have.property('body', 'Cuerpo');
                        done();
                    });
            });
            it('Debería dar error al intentar buscar una nota inexistente', (done) => {
                chai.request(app)
                    .get('/notes/5aed2448db42172eb078bba3')
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    });
            });
        });
        describe('MÉTODO: patch', () => {
            let insertedNote = '';
            before((done) => {
                chai.request(app)
                    .post('/notes')
                    .send({
                        'title': 'Título',
                        'body': 'Cuerpo'
                    })
                    .end((err, res) => {
                        insertedNote = res.body._id;
                        done();
                    });
            });
            after((done) => {
                chai.request(app)
                    .delete(`/notes/${insertedNote}`)
                    .end(() =>{
                        done();
                    });
            });
            it('Debería dar error al intentar modificar una nota inexistente', (done) => {
                let note = {
                    'title': 'edit',
                    'body': 'body'
                };
                chai.request(app)
                    .patch('/notes/5aed2448db42172eb078bba3')
                    .send(note)
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    });
            });
            it('Debería poder editar una nota pasándole sólo el `title`', (done) => {
                let note = {
                    'title': 'Título'
                };
                chai.request(app)
                    .patch(`/notes/${insertedNote}`)
                    .send(note)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
            it('Debería poder editar una nota pasándole sólo el `body`', (done) => {
                let note = {
                    'body': 'body'
                };
                chai.request(app)
                    .patch(`/notes/${insertedNote}`)
                    .send(note)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
        });
    });
    run();
}, delay);
