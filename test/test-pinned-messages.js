// Import the dependencies for testing
var chai = require('chai');
var chaiHttp = require('chai-http');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Pripremanje podataka', () => {
    describe('GET /pinovanePoruke', () => {
        it('Vratit će se poruke iz baze', (done) => {
            chai.request('http://localhost:31910')
                .get('/pinovanePoruke')
                .end((err, res) => {
                    res.should.have.status(200)
                    done()
                })
        })
    }) 
})
