/**
 * Tests for /api/categories
 */

/** Package imports */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../server';
import { category } from '../models/category.model';

/** Chai plugins */
chai.use(chaiHttp);
chai.should();

let completeCategory = new category({
    name: 'furniture'
});

describe('Category API', () => {
    beforeEach((done) => {
        category.deleteMany({}, (err) => {
            done();
        });
    });

    /**
     * Test the /GET route
     */
    describe('GET /api/categories', () => {
        it('it should GET all the categories', (done) => {
            chai.request(app)
                .get('/api/categories')
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
    describe('POST /api/categories', () => {
        it('it should POST a new category', (done) => {
            chai.request(app)
                .post('/api/categories')
                .send(completeCategory)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.data.status.should.be.eql('success');
                    res.body.data.docs.should.be.a('object');
                    res.body.data.docs.name.should.be.eql(completeCategory.name);
                    done();
                });
        });
        it('it should not POST a new category without name', (done) => {
            let categoryWoName = new category({});
            chai.request(app)
                .post('/api/categories')
                .send(categoryWoName)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.data.status.should.be.eql('error');
                    done();
                });
        });
    });

    /**
     * Test the /GET/:categoryid route
     */
    describe('GET /api/categories/:categoryid', () => {
        it('it should GET a category by given id', (done) => {
            completeCategory.save((err, act) => {
                chai.request(app)
                    .get('/api/categories/' + completeCategory.id)
                    .send(completeCategory)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.status.should.be.eql('success');
                        res.body.data.docs.should.have.property('name');
                        done();
                    });
            });
        });
    });

    /**
     * Test the /PUT/:categoryid route
     */
    describe('PUT /api/categories/:categoryid', () => {
        it('it should UPDATE a category by given id', (done) => {
            let updateCategory = new category({
                name: 'furniture'
            });
            updateCategory.save((err, act) => {
                chai.request(app)
                    .put('/api/categories/' + updateCategory.id)
                    .send({
                        name: 'electronic',
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.status.should.be.eql('success');
                        res.body.data.docs.name.should.be.not.eql(updateCategory.name);
                        res.body.data.docs.name.should.be.eql('electronic');
                        done();
                    });
            });
        });
    });

    /**
     * Test the /DELETE/:categoryid route
     */
    describe('DELETE /api/categories/:categoryid', () => {
        it('it should DELETE a category by given id', (done) => {
            let deleteCategory = new category({
                name: 'furniture'
            });
            deleteCategory.save((err, act) => {
                chai.request(app)
                    .delete('/api/categories/' + deleteCategory.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.status.should.be.eql('success');
                        res.body.data.docs.name.should.be.eql(deleteCategory.name);
                        done();
                    });
            });
        });
    });
    /**
     * Test the POST /api/categories/delete_all
     */
    describe('POST /api/categories/delete_all', () => {
        it('it should DELETE all categories', (done) => {
            chai.request(app)
                .post('/api/categories')
                .send(completeCategory)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.data.status.should.be.eql('success');
                    res.body.data.docs.should.be.a('object');
                    res.body.data.docs.name.should.be.eql(completeCategory.name);
                });
            chai.request(app)
                .get('/api/categories')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.data.status.should.be.eql('success');
                    res.body.data.items.should.be.eql(1);
                    res.body.data.docs.should.be.a('array');
                });
            chai.request(app)
                .delete('/api/categories/delete_all')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.status.should.be.eql('success');
                    done();
                });
        });
    });
});
