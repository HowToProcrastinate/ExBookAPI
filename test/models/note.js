const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const app = require('../../src/index');

chai.use(chaiHttp);

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
        
        describe(`Debería poder crear una nota pasándole los atributos 
        'title' y 'body' opcionalmente alguno de ellos o ambos`, () => {
            
            afterEach(() =>{
                chai.request(app)
                    .delete('/notes/1')
                    .end();
            });

            it('Debería poder crear una nota pasándole sólo el title', (done) => {
                let note = {
                    'title': 'Titulo'
                };
                chai.request(app)
                    .post('/notes')
                    .send(note)
                    .end((err, res) => {
                        res.should.have.status(201);
                        done();
                    });
            });
            it('Debería poder crear una nota pasándole sólo el body', (done) => {
                let note = {
                    'body': 'body'
                };
                chai.request(app)
                    .post('/notes')
                    .send(note)
                    .end((err, res) => {
                        res.should.have.status(201);
                        done();
                    });
            });
        });
    });
    describe('METODO: list', () => {
        before(() => {
            for(let i = 0; i < 10; i++) {
                chai.request(app)
                    .post('/notes')
                    .send({
                        'title': `Título ${i}`,
                        'body': `Cuerpo ${i}`
                    })
                    .end();
            }
        });
        after(() =>{
            for(let i = 0; i < 10; i++) {
                chai.request(app)
                    .delete('/notes/' + (i + 1))
                    .end();
            }
        });
        it('Debería listar todos los elementos', (done) => {
            chai.request(app)
                .get('/notes')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.lengthOf(10);
                    done();
                });
        });
    });
    describe('METODO: get', () => {
        before(() => {
            chai.request(app)
                .post('/notes')
                .send({
                    'title': 'Título',
                    'body': 'Cuerpo'
                })
                .end();
        });
        it('Debería mostrar la información de una nota', (done) => {
            chai.request(app)
                .get('/notes/1')
                .end((err, res) => {
                    res.should.have.status(200);
                    let body = res.body;
                    body.should.have.property('title', 'Título');
                    body.should.have.property('body', 'Cuerpo');
                    done();
                });
        });
    });
});