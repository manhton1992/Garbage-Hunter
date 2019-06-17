/**
 * Tests for /api/user_category
 */

/** Package imports */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../server';
import { userCategory } from '../models/user-category.model';

/** Chai plugins */
chai.use(chaiHttp);
chai.should();

let completeMessageCategory = new userCategory({
    userId: 'bdS23nK',
    categoryId: '34BKd3',
});

describe('User_Category API', () => {
    beforeEach((done) => {
        userCategory.deleteMany({}, (err) => {
            done();
        });
    });

    /**
     * Test the /GET route
     */
    describe('GET /api/user_category', () => {
        it('it should GET all the user_category', (done) => {
            chai.request(app)
                .get('/api/user_category')
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
    describe('POST /api/user_category', () => {
        it('it should POST a new user_category', (done) => {
            chai.request(app)
                .post('/api/user_category')
                .send(completeMessageCategory)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.data.status.should.be.eql('success');
                    res.body.data.docs.should.be.a('object');
                    res.body.data.docs.categoryId.should.be.eql(completeMessageCategory.categoryId);
                    res.body.data.docs.userId.should.be.eql(completeMessageCategory.userId);
                    done();
                });
        });
        it('it should not POST a new category without name', (done) => {
            let userCategoryWoCategoryid = new userCategory({
                userId: '248Nkf',
            });
            chai.request(app)
                .post('/api/user_category')
                .send(userCategoryWoCategoryid)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.data.status.should.be.eql('error');
                    done();
                });
        });
        it('it should not POST a new category without name', (done) => {
            let userCategoryWoUserId = new userCategory({
                categoryId: '248Nkf',
            });
            chai.request(app)
                .post('/api/user_category')
                .send(userCategoryWoUserId)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.data.status.should.be.eql('error');
                    done();
                });
        });
    });

    /**
     * Test the /GET/:usercategoryid route
     */
    describe('GET /api/user_category/:usercategoryid', () => {
        it('it should GET a user_category by given id', (done) => {
            completeMessageCategory.save((err, act) => {
                chai.request(app)
                    .get('/api/user_category/' + completeMessageCategory.id)
                    .send(completeMessageCategory)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.status.should.be.eql('success');
                        res.body.data.docs.should.have.property('userId');
                        res.body.data.docs.should.have.property('categoryId');
                        done();
                    });
            });
        });
    });

    /**
     * Test the /PUT/:usercategoryid route
     */
    describe('PUT /api/user_category/:usercategoryid', () => {
        it('it should UPDATE a user_category by given id', (done) => {
            let updateUserCategory = new userCategory({
                userId: 'bdS23nK',
                categoryId: '34BKd3',
            });
            updateUserCategory.save((err, act) => {
                chai.request(app)
                    .put('/api/user_category/' + updateUserCategory.id)
                    .send({
                        userId: '34kDNk',
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.status.should.be.eql('success');
                        res.body.data.docs.userId.should.be.not.eql(updateUserCategory.userId);
                        res.body.data.docs.userId.should.be.eql('34kDNk');
                        done();
                    });
            });
        });
    });

    /**
     * Test the /DELETE/:usercategoryid route
     */
    describe('DELETE /api/user_category/:usercategoryid', () => {
        it('it should DELETE a user_category by given id', (done) => {
            let deleteUserCategory = new userCategory({
                userId: 'bdS23nK',
                categoryId: '34BKd3',
            });
            deleteUserCategory.save((err, act) => {
                chai.request(app)
                    .delete('/api/user_category/' + deleteUserCategory.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.status.should.be.eql('success');
                        res.body.data.docs.userId.should.be.eql(deleteUserCategory.userId);
                        res.body.data.docs.categoryId.should.be.eql(deleteUserCategory.categoryId);
                        done();
                    });
            });
        });
    });
    /**
     * Test the POST /api/user_category/delete_all
     */
    describe('POST /api/user_category/delete_all', () => {
        it('it should DELETE all user_category', (done) => {
            chai.request(app)
                .post('/api/user_category')
                .send(completeMessageCategory)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.data.status.should.be.eql('success');
                    res.body.data.docs.should.be.a('object');
                    res.body.data.docs.userId.should.be.eql(completeMessageCategory.userId);
                    res.body.data.docs.categoryId.should.be.eql(completeMessageCategory.categoryId);
                });
            chai.request(app)
                .get('/api/user_category')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.data.status.should.be.eql('success');
                    res.body.data.items.should.be.eql(1);
                    res.body.data.docs.should.be.a('array');
                });
            chai.request(app)
                .delete('/api/user_category/delete_all')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.status.should.be.eql('success');
                    done();
                });
        });
    });
});
