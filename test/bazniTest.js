// Import the dependencies for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../server');
// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Hotel", () => {
    describe("GET /test", () => {
        it ("treba vratit nesto bzvz", (done) => {
            chai.request('http://localhost:31910')
                .get('/test')
                .end((err, res) => {
                    res.should.have.status(121)
                    done()
                })
        })
      
        
    });
});