/**
 * Tests for /api/email
 */

/** Package imports */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../server';

/** Chai plugins */
chai.use(chaiHttp);
chai.should();

describe('Email API', () => {
    /**
     * Test the /GET route
     */
    describe('GET /api/email', () => {
        it('it should GET send email subscribe', (done) => {
            chai.request(app)
                .get('/api/comments')
                .query({userId: '24bdD3', messageId: 'kDbk3H'})
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});