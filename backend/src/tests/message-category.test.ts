/**
 * Tests for /api/message_category
 */

/** Package imports */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../server';
import { messageCategory } from '../models/message-category.model';

/** Chai plugins */
chai.use(chaiHttp);
chai.should();

let completeMessageCategory = new messageCategory({
    messageId: 'bdS23nK',
    categoryId: '34BKd3',
});

describe('Message_Category API', () => {
    beforeEach((done) => {
        messageCategory.deleteMany({}, (err) => {
            done();
        });
    });

    /**
     * Test the /GET route
     */
    describe('GET /api/message_category', () => {
        it('it should GET all the message_category', (done) => {
            chai.request(app)
                .get('/api/message_category')
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
    describe('POST /api/message_category', () => {
        it('it should POST a new message_category', (done) => {
            chai.request(app)
                .post('/api/message_category')
                .send(completeMessageCategory)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.data.status.should.be.eql('success');
                    res.body.data.docs.should.be.a('object');
                    res.body.data.docs.categoryId.should.be.eql(completeMessageCategory.categoryId);
                    res.body.data.docs.messageId.should.be.eql(completeMessageCategory.messageId);
                    done();
                });
        });
        it('it should not POST a new category without name', (done) => {
            let messageCategoryWoCategoryid = new messageCategory({
                messageId: '248Nkf',
            });
            chai.request(app)
                .post('/api/message_category')
                .send(messageCategoryWoCategoryid)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.data.status.should.be.eql('error');
                    done();
                });
        });
        it('it should not POST a new category without name', (done) => {
            let messageCategoryWoMessageid = new messageCategory({
                categoryId: '248Nkf',
            });
            chai.request(app)
                .post('/api/message_category')
                .send(messageCategoryWoMessageid)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.data.status.should.be.eql('error');
                    done();
                });
        });
    });

    /**
     * Test the /GET/:messagecategoryid route
     */
    describe('GET /api/message_category/:messagecategoryid', () => {
        it('it should GET a message_category by given id', (done) => {
            completeMessageCategory.save((err, act) => {
                chai.request(app)
                    .get('/api/message_category/' + completeMessageCategory.id)
                    .send(completeMessageCategory)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.status.should.be.eql('success');
                        res.body.data.docs.should.have.property('messageId');
                        res.body.data.docs.should.have.property('categoryId');
                        done();
                    });
            });
        });
    });

    /**
     * Test the /PUT/:messagecategoryid route
     */
    describe('PUT /api/message_category/:messagecategoryid', () => {
        it('it should UPDATE a message_category by given id', (done) => {
            let updateMessageCategory = new messageCategory({
                messageId: 'bdS23nK',
                categoryId: '34BKd3',
            });
            updateMessageCategory.save((err, act) => {
                chai.request(app)
                    .put('/api/message_category/' + updateMessageCategory.id)
                    .send({
                        messageId: '34kDNk',
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.status.should.be.eql('success');
                        res.body.data.docs.messageId.should.be.not.eql(updateMessageCategory.messageId);
                        res.body.data.docs.messageId.should.be.eql('34kDNk');
                        done();
                    });
            });
        });
    });

    /**
     * Test the /DELETE/:messagecategoryid route
     */
    describe('DELETE /api/message_category/:messagecategoryid', () => {
        it('it should DELETE a message_category by given id', (done) => {
            let deleteMessageCategory = new messageCategory({
                messageId: 'bdS23nK',
                categoryId: '34BKd3',
            });
            deleteMessageCategory.save((err, act) => {
                chai.request(app)
                    .delete('/api/message_category/' + deleteMessageCategory.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.status.should.be.eql('success');
                        res.body.data.docs.messageId.should.be.eql(deleteMessageCategory.messageId);
                        res.body.data.docs.categoryId.should.be.eql(deleteMessageCategory.categoryId);
                        done();
                    });
            });
        });
    });
    /**
     * Test the POST /api/message_category/delete_all
     */
    describe('POST /api/message_category/delete_all', () => {
        it('it should DELETE all message_category', (done) => {
            chai.request(app)
                .post('/api/message_category')
                .send(completeMessageCategory)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.data.status.should.be.eql('success');
                    res.body.data.docs.should.be.a('object');
                    res.body.data.docs.messageId.should.be.eql(completeMessageCategory.messageId);
                    res.body.data.docs.categoryId.should.be.eql(completeMessageCategory.categoryId);
                });
            chai.request(app)
                .get('/api/message_category')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.data.status.should.be.eql('success');
                    res.body.data.items.should.be.eql(1);
                    res.body.data.docs.should.be.a('array');
                });
            chai.request(app)
                .delete('/api/message_category/delete_all')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.status.should.be.eql('success');
                    done();
                });
        });
    });
});
