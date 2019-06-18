/**
 * Tests for /api/messages
 */

/** Package imports */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { message } from '../models/message.model';
import { user } from '../models/user.model';
import { app } from '../server';
import { setTimeout } from 'timers';

/** Chai plugins */
chai.use(chaiHttp);
chai.should();

let completeMessage = new message({
    title: 'beautiful chair',
    description: 'there is a beautiful second hand chair that might be useful',
    creatorId: 'abcDe2312',
    lon: 89.11,
    lat: 40.31,
    address: 'havelstrasse 7, 64295 darmstadt',
    imageUrl: 'https://garbage-hunter.s3.eu-central-1.amazonaws.com/1560358454333',
    phone: 15647472983,
});

/** save the token for authorization */
let token: string;

before((done) => {
    let userid: string;
    user.deleteMany({});
    it('it should register new user', (done) => {
        chai.request(app)
            .post('/api/users/register')
            .send({email: 'test@test.com', password: 'test'})
            .end((err, res) => {
                res.should.have.status(201);
                userid = res.body.data.docs._id;
                done();
            });
    });
    it('it should register new user', (done) => {
        chai.request(app)
            .put('/api/users/' + userid)
            .send({isConfirm: true})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('it should login the user', (done) => {
        chai.request(app)
            .get('/api/users/login')
            .query({email: 'test@test.com', password: 'test'})
            .end((err, res) => {
                res.should.have.status(200);
                token = res.body.data.token;
                console.log(token);
                done();
            });
    });
    done();
})

describe('Message API', () => {

    beforeEach((done) => {
        message.deleteMany({}, (err) => {
            done();
        });
    });

    /**
     * Test the /GET route
     */
    describe('GET /api/messages', () => {
        it('it should GET all the messages', (done) => {
            chai.request(app)
                .get('/api/messages')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.data.status.should.be.eql('success');
                    res.body.data.docs.should.be.a('array');
                    done();
                });
        });
    });

    /**
     * Test the /POST route
     */
    describe('POST /api/messages', () => {
        it('it should POST a new message', (done) => {
            chai.request(app)
                .post('/api/messages')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .send(completeMessage)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.data.status.should.be.eql('success');
                    res.body.data.docs.should.be.a('object');
                    res.body.data.docs.title.should.be.eql(completeMessage.title);
                    res.body.data.docs.description.should.be.eql(completeMessage.description);
                    res.body.data.docs.should.include.key('created_at');
                    res.body.data.docs.should.include.key('updated_at');
                    done();
                });
        });
        it('it should not POST a new message without authorization', (done) => {
            let completeMessageWoAuth = new message({
                title: 'test yoo',
                description: 'there is a beautiful second hand chair that might be useful',
                creatorId: 'abcDe2312',
                lon: 89.11,
                lat: 40.31,
                address: 'havelstrasse 7, 64295 darmstadt',
                imageUrl: 'https://garbage-hunter.s3.eu-central-1.amazonaws.com/1560358454333',
                phone: 15647472983,
            });
            chai.request(app)
                .post('/api/messages')
                .send(completeMessageWoAuth)
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.data.status.should.be.eql('error');
                    done();
                });
            setTimeout(done, 3000);
        });
        it('it should POST a new message without phone', (done) => {
            let completeMessageWoPhone = new message({
                title: 'beautiful chair',
                description: 'there is a beautiful second hand chair that might be useful',
                creatorId: 'abcDe2312',
                lon: 89.11,
                lat: 40.31,
                address: 'havelstrasse 7, 64295 darmstadt',
                imageUrl: 'https://garbage-hunter.s3.eu-central-1.amazonaws.com/1560358454333',
            });
            chai.request(app)
                .post('/api/messages')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .send(completeMessageWoPhone)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.data.status.should.be.eql('success');
                    done();
                });
        });
    });

    /**
     * Test the /GET/:messageid route
     */
    describe('GET /api/messages/:messageid', () => {
        it('it should GET a message by given id', (done) => {
            completeMessage.save((err, act) => {
                chai.request(app)
                    .get('/api/messages/' + completeMessage.id)
                    .send(completeMessage)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.status.should.be.eql('success');
                        res.body.data.docs.should.have.property('title');
                        res.body.data.docs.should.have.property('description');
                        res.body.data.docs.should.have.property('lon');
                        res.body.data.docs.should.have.property('lat');
                        res.body.data.docs.should.have.property('address');
                        res.body.data.docs.should.have.property('available');
                        res.body.data.docs.should.have.property('archive');
                        res.body.data.docs.should.have.property('imageUrl');
                        res.body.data.docs.should.have.property('phone');
                        res.body.data.docs.should.have.property('created_at');
                        res.body.data.docs.should.have.property('updated_at');
                        done();
                    });
            });
        });
    });

    /**
     * Test the /PUT/:messageid route
     */
    describe('PUT /api/messages/:messageid', () => {
        it('it should UPDATE a message by given id', (done) => {
            let updateMessage = new message({
                title: 'beautiful chair',
                description: 'there is a beautiful second hand chair that might be useful',
                creatorId: 'abcDe2312',
                lon: 89.11,
                lat: 40.31,
                address: 'havelstrasse 7, 64295 darmstadt',
                imageUrl: 'https://garbage-hunter.s3.eu-central-1.amazonaws.com/1560358454333',
                phone: 15647472983,
            });
            updateMessage.save((err, act) => {
                chai.request(app)
                    .put('/api/messages/' + updateMessage.id)
                    .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                    .send({
                        title: 'not beautiful chair',
                        description: 'just realised the chair is not beautiful',
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.status.should.be.eql('success');
                        res.body.data.docs.title.should.be.not.eql(updateMessage.title);
                        res.body.data.docs.title.should.be.eql('not beautiful chair');
                        res.body.data.docs.description.should.be.not.eql(updateMessage.description);
                        res.body.data.docs.description.should.be.eql('just realised the chair is not beautiful');
                        res.body.data.docs.creatorId.should.be.eql(updateMessage.creatorId);
                        res.body.data.docs.lon.should.be.eql(updateMessage.lon);
                        res.body.data.docs.lat.should.be.eql(updateMessage.lat);
                        res.body.data.docs.address.should.be.eql(updateMessage.address);
                        res.body.data.docs.imageUrl.should.be.eql(updateMessage.imageUrl);
                        done();
                    });
            });
        });
    });

    /**
     * Test the /DELETE/:messageid route
     */
    describe('DELETE /api/messages/:messageid', () => {
        it('it should DELETE a message by given id', (done) => {
            let deleteMessage = new message({
                title: 'beautiful chair',
                description: 'there is a beautiful second hand chair that might be useful',
                creatorId: 'abcDe2312',
                lon: 89.11,
                lat: 40.31,
                address: 'havelstrasse 7, 64295 darmstadt',
                imageUrl: 'https://garbage-hunter.s3.eu-central-1.amazonaws.com/1560358454333',
                phone: 15647472983,
            });
            deleteMessage.save((err, act) => {
                chai.request(app)
                    .delete('/api/messages/' + deleteMessage.id)
                    .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.status.should.be.eql('success');
                        res.body.data.docs.title.should.be.eql(deleteMessage.title);
                        res.body.data.docs.description.should.be.eql(deleteMessage.description);
                        res.body.data.docs.creatorId.should.be.eql(deleteMessage.creatorId);
                        res.body.data.docs.lon.should.be.eql(deleteMessage.lon);
                        res.body.data.docs.lat.should.be.eql(deleteMessage.lat);
                        res.body.data.docs.address.should.be.eql(deleteMessage.address);
                        res.body.data.docs.imageUrl.should.be.eql(deleteMessage.imageUrl);
                        done();
                    });
            });
        });
    });
    /**
     * Test the POST /api/messages/delete_all
     */
    describe('POST /api/messages/delete_all', () => {
        it('it should DELETE all messages', (done) => {
            chai.request(app)
                .post('/api/messages')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .send(completeMessage)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.data.status.should.be.eql('success');
                    res.body.data.docs.should.be.a('object');
                    res.body.data.docs.title.should.be.eql(completeMessage.title);
                    res.body.data.docs.description.should.be.eql(completeMessage.description);
                });
            chai.request(app)
                .get('/api/messages')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.data.status.should.be.eql('success');
                    res.body.data.docs.should.be.a('array');
                });
            chai.request(app)
                .delete('/api/messages/delete_all')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.status.should.be.eql('success');
                    res.body.data.message.should.be.eql('all messages are deleted');
                    done();
                });
        });
    });

    /**
     * Test the GET /api/messages/download
     */
    describe('GET /api/messages/download', () => {
        it('it should GET all messages in a CSV data', (done) => {
            chai.request(app)
                .get('/api/messages/download')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.header['content-disposition'].should.be.eql('attachment; filename="all_messages.csv"');
                    res.header['content-type'].should.be.eql('text/csv; charset=utf-8');
                    done();
                });
        });
    });

    // TODO find out how to send image file
    /**
     * Test the POST /api/messages/image_upload
     */
    // describe('POST /api/messages/image_upload', () => {
    //     it('it should POST image to AWS S3 server', (done) => {
    //         chai.request(app)
    //             .post('/api/messages/image_upload')
    //             .type('form')
    //             // .attach('image', readFileSync(__dirname + '/resources/test-image-upload.png'))
    //             // .field('image', readFileSync(__dirname + '/resources/test-image-upload.png'))
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.data.docs.should.have.property('imageUrl');
    //                 done();
    //             });
    //     });
    // });
});
