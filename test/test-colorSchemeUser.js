// Import the dependencies for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = require('assert');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Podaci o boji', () => {
    describe('GET /colorschemeUser/:ime', () => {
        it('Vratit će se boja za nekog korisnika', (done) => {
            let ime = 'abrdanin1@etf.unsa.ba'
            chai.request('http://localhost:31910')
                .get('/colorschemeUser/' + ime)
                .end((err, res) => {
                    res.should.have.status(200);
                    //console.log(res.body)
                    assert.equal(res.body.colorId, "#1976d2")
                    done()
                })
        })
    })
})