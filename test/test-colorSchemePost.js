// Import the dependencies for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = require('assert');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Podaci o boji', () => {
    describe('POST /colorscheme', () => {
        it('Upisat će se boja za nekog korisnika', (done) => {
            let ime = 'mnedic1@etf.unsa.ba'
            let boja = '#123abc'
            let poslano = {'userId':ime, 'colorId': boja};
            chai.request('http://localhost:31910')
                .post('/colorscheme/')
                .send(poslano)
                .end((err, res) => {
                    res.should.have.status(200);
                    //console.log(res.body)

                    assert.equal(res.body.userId, ime)
                    done()
                })
        })
    })
})