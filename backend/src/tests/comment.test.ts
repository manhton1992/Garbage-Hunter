/**
 * Tests for /api/comments
 */

/** Package imports */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../server';
import { comment } from '../models/comment.model';

/** Chai plugins */
chai.use(chaiHttp);
chai.should();

let completeComment = new comment({
    text: 'this garbage is so useful! hope no one takes it!',
    creatorId: '234Dh3n',
    parentId: '43i3nJ',
    messageId: '343bd24',
    imageUrl: 'https//:test.com',
    archive: false,
});

describe('Comment API', () => {
    beforeEach((done) => {
        comment.deleteMany({}, (err) => {
            done();
        });
    });

    /**
     * Test the /GET route
     */
    describe('GET /api/comments', () => {
        it('it should GET all the comments', (done) => {
            chai.request(app)
                .get('/api/comments')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.data.status.should.be.eql('success');
                    res.body.data.items.should.be.eql(0);
                    res.body.data.docs.should.be.a('array');
                    done();
                });
        });
    });

    /**
     * Test the /POST route
     */
    describe('POST /api/comments', () => {
        it('it should POST a new comment', (done) => {
            chai.request(app)
                .post('/api/comments')
                .send(completeComment)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.data.status.should.be.eql('success');
                    res.body.data.docs.should.be.a('object');
                    res.body.data.docs.text.should.be.eql(completeComment.text);
                    res.body.data.docs.creatorId.should.be.eql(completeComment.creatorId);
                    res.body.data.docs.parentId.should.be.eql(completeComment.parentId);
                    res.body.data.docs.should.include.key('created_at');
                    done();
                });
        });
        it('it should not POST a new comment without text', (done) => {
            let commentWoText = new comment({
                creatorId: '234Dh3n',
                parentId: '43i3nJ',
                messageId: '343bd24',
                imageUrl: 'https//:test.com',
                archive: false,
            });
            chai.request(app)
                .post('/api/comments')
                .send(commentWoText)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.data.status.should.be.eql('error');
                    done();
                });
        });
        it('it should POST a new comment without image', (done) => {
            let commentWoImage = new comment({
                text: 'this garbage is so useful! hope no one takes it!',
                creatorId: '234Dh3n',
                parentId: '43i3nJ',
                messageId: '343bd24',
                archive: false,
            });
            chai.request(app)
                .post('/api/comments')
                .send(commentWoImage)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.data.status.should.be.eql('success');
                    done();
                });
        });
    });

    /**
     * Test the /GET/:commentid route
     */
    describe('GET /api/comments/:commentid', () => {
        it('it should GET a comment by given id', (done) => {
            completeComment.save((err, act) => {
                chai.request(app)
                    .get('/api/comments/' + completeComment.id)
                    .send(completeComment)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.status.should.be.eql('success');
                        res.body.data.docs.should.have.property('text');
                        res.body.data.docs.should.have.property('creatorId');
                        res.body.data.docs.should.have.property('parentId');
                        res.body.data.docs.should.have.property('archive');
                        res.body.data.docs.should.have.property('imageUrl');
                        res.body.data.docs.should.have.property('created_at');
                        done();
                    });
            });
        });
    });

    /**
     * Test the /PUT/:commentid route
     */
    describe('PUT /api/comments/:commentid', () => {
        it('it should UPDATE a comment by given id', (done) => {
            let updateComment = new comment({
                text: 'this garbage is so useful! hope no one takes it!',
                creatorId: '234Dh3n',
                parentId: '43i3nJ',
                messageId: '343bd24',
                archive: false,
            });
            updateComment.save((err, act) => {
                chai.request(app)
                    .put('/api/comments/' + updateComment.id)
                    .send({
                        text: 'not good',
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.status.should.be.eql('success');
                        res.body.data.docs.text.should.be.not.eql(updateComment.text);
                        res.body.data.docs.text.should.be.eql('not good');
                        done();
                    });
            });
        });
    });

    /**
     * Test the /DELETE/:commentid route
     */
    describe('DELETE /api/comments/:commentid', () => {
        it('it should DELETE a comment by given id', (done) => {
            let deleteComment = new comment({
                text: 'this garbage is so useful! hope no one takes it!',
                creatorId: '234Dh3n',
                parentId: '43i3nJ',
                messageId: '343bd24',
                archive: false,
            });
            deleteComment.save((err, act) => {
                chai.request(app)
                    .delete('/api/comments/' + deleteComment.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.status.should.be.eql('success');
                        res.body.data.docs.text.should.be.eql(deleteComment.text);
                        done();
                    });
            });
        });
    });
    /**
     * Test the POST /api/comments/delete_all
     */
    describe('POST /api/comments/delete_all', () => {
        it('it should DELETE all comments', (done) => {
            chai.request(app)
                .post('/api/comments')
                .send(completeComment)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.data.status.should.be.eql('success');
                    res.body.data.docs.should.be.a('object');
                    res.body.data.docs.text.should.be.eql(completeComment.text);
                });
            chai.request(app)
                .get('/api/comments')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.data.status.should.be.eql('success');
                    res.body.data.items.should.be.eql(1);
                    res.body.data.docs.should.be.a('array');
                });
            chai.request(app)
                .delete('/api/comments/delete_all')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.status.should.be.eql('success');
                    done();
                });
        });
    });
});
