var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = require('assert');

chai.use(chaiHttp);
chai.should();

describe('Pripremanje podataka', () => {
    describe('POST /event', () => {
        it('Vratit će se poruka iz baze da je insertovan novi red', (done) => {
            const newRow = {
                kreirao: 'bot@bot',
                naziv: 'Dummy',
                pocetak: Date.now().toString(),
                kraj: Date.now().toString()
            }

            chai.request('http://localhost:31910')
                .post('/event')
                .send(newRow)
                .end((err, res) => {
                    res.should.have.status(200)
                    assert.equal(newRow.naziv, res.body.naziv);
                    assert.equal(newRow.kreirao, res.body.kreirao);
                })
                done()
        })
    }) 
})