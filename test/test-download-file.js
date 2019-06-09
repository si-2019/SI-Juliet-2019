// Import the dependencies for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = require('assert');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Pripremanje podataka', () => {
    describe('GET /download/:ime', () => {
        it('Vratit će se fajl sa navedenim imenom', (done) => {
            let imeFajla = 'neki_txt.txt';
            chai.request('http://localhost:31910')
                .get('/download/' + imeFajla)
                .end((err, res) => {
                    res.should.have.status(200);
                    assert.equal(res.body.naziv, imeFajla)
                })
                done()
        })
    })
})