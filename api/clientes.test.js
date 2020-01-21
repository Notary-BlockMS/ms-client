const test = require('tape');
const supertest = require('supertest');
const clientes = require('./clientes');
const server = require("../server/server");
const repository = require("../repository/repository");


function runTests() {
    var app = null;
    server.start(clientes, repository, (err,app) => {
        var id = null;
        test('GET /clientes', (t) => {
            supertest(app)
            .get('/clientes')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if(res.body && res.body.clientes.length > 0) id = res.body.clientes[0]._id;
                t.error(err, 'No errors')
                t.assert(res.body && res.body.clientes.length > 0, "All Clients returned!")
                t.end()
            })
        })

        test('GET /clientes/:id', (t) => {

            if(!id) {
                t.assert(false, "Cliente by Id Returned");
                t.end();
                return;
            }
 
            supertest(app)
                .get('/clientes/' + id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) =>{
                    t.error(err, 'No errors')
                    t.assert(res.body, "Clientes By Id returned")
                    t.end()  
                })
        })

        test('DELETE /clientes/:id', (t) => {

            if(!id) {
                t.assert(false, "Client deleted By Id");
                t.end();
                return;
            }
 
            supertest(app)
                .delete('/clientes/' + id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) =>{
                    t.error(err, 'No errors')
                    t.assert(res.body, "Client deleted By Id")
                    t.end()  
                })
        })

        test('PUT /clientes/:id', (t) => {

            if(!id) {
                t.assert(false, "Client updated By Id");
                t.end();
                return;
            }
 
            supertest(app)
                .put('/clientes/' + id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) =>{
                    t.error(err, 'No errors')
                    t.assert(res.body, "Client updated By Id")
                    t.end()  
                    process.exit(0);
                })
        })



    })
}

module.exports = {runTests}