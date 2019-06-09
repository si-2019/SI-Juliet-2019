// Import the dependencies for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = require('assert');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Podaci o boji', () => {
    describe('GET /colorscheme/:ime', () => {
        it('Vratit će se da li neki korisnik vec ima selektovanu boju', (done) => {
            let ime = 'abrdanin1@etf.unsa.ba'
            chai.request('http://localhost:31910')
                .get('/colorscheme/' + ime)
                .end((err, res) => {
                    res.should.have.status(200);
                    assert.equal(res.body, 1)
                    done()
                })
        })
    })
})