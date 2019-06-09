var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = require('assert');

chai.use(chaiHttp);
chai.should();

describe('Pripremanje podataka', () => {
    describe('POST /thread', () => {
        it('Vratit će se poruka iz baze da je insertovan novi red', (done) => {
            const newRow = {
                messageId: '100096633'
            }

            chai.request('http://localhost:31910')
                .post('/event')
                .send(newRow)
                .end((err, res) => {
                    res.should.have.status(200)
                    assert.equal(res.body.message, 'New thread created!')
                })
                done()
        })
    }) 
})