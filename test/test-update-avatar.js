// Import the dependencies for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../server');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("kreiranje", () => {
    describe("POST /updateAvatar", () => {
        it ("treba vratiti poruku Avatar update-ovan", (done) => {
            const podaci = {
                currentUId: 'bot@bot',
                url: 'https://cdn4.iconfinder.com/data/icons/superheroes/512/batman-512.png',
            }
            chai.request('http://localhost:31910')
                .post('/updateAvatar')
                .send(podaci)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property('message')
                    res.body.should.have.property('message').eql('Avatar update-ovan')
                    done()
                })
        })
    });
});