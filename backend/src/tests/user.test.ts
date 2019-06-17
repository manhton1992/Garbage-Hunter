/**
 * Tests for /api/users
 */

/** Package imports */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { user } from '../models/user.model';
import { app } from '../server';

/** Chai plugins */
chai.use(chaiHttp);
chai.should();

let completeUser = new user({
    email: 'garbage-hunter@gmail.com',
    firstName: 'Garbage',
    lastName: 'Hunter',
    phoneNumber: 3454642,
    passwordHash: 'NDFKJdfkjdf3498dfjkdnNDJF34',
    isAdmin: true,
    isConfirm: true,
    profileImageUrl: `http//:test.com`,
});

describe('User API', () => {
    beforeEach((done) => {
        user.deleteMany({}, (err) => {
            done();
        });
    });

    /**
     * Test the /GET route
     */
    describe('GET /api/users', () => {
        it('it should GET all the users', (done) => {
            chai.request(app)
                .get('/api/users')
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
    describe('POST /api/users', () => {
        it('it should POST a new user', (done) => {
            chai.request(app)
                .post('/api/users')
                .send(completeUser)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.data.status.should.be.eql('success');
                    res.body.data.docs.should.be.a('object');
                    res.body.data.docs.email.should.be.eql(completeUser.email);
                    res.body.data.docs.firstName.should.be.eql(completeUser.firstName);
                    res.body.data.docs.lastName.should.be.eql(completeUser.lastName);
                    res.body.data.docs.phoneNumber.should.be.eql(completeUser.phoneNumber);
                    res.body.data.docs.isAdmin.should.be.eql(completeUser.isAdmin);
                    res.body.data.docs.isConfirm.should.be.eql(completeUser.isConfirm);
                    res.body.data.docs.should.include.key('created_at');
                    res.body.data.docs.should.include.key('updated_at');
                    done();
                });
        });
        it('it should not POST a new user without email', (done) => {
            let completeUserWoEmail = new user({
                firstName: 'Garbage',
                lastName: 'Hunter',
                phoneNumber: 3454642,
                passwordHash: 'NDFKJdfkjdf3498dfjkdnNDJF34',
                isAdmin: true,
                isConfirm: true,
                profileImageUrl: `http//:test.com`,
            });
            chai.request(app)
                .post('/api/users')
                .send(completeUserWoEmail)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.data.status.should.be.eql('error');
                    done();
                });
        });
        it('it should POST a new user without firstName and lastName', (done) => {
            let completeUserWoPhone = new user({
                email: 'garbage-hunter@gmail.com',
                phoneNumber: 3454642,
                passwordHash: 'NDFKJdfkjdf3498dfjkdnNDJF34',
                isAdmin: true,
                isConfirm: true,
                profileImageUrl: `http//:test.com`,
            });
            chai.request(app)
                .post('/api/users')
                .send(completeUserWoPhone)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.data.status.should.be.eql('success');
                    done();
                });
        });
    });

    /**
     * Test the /GET/:userid route
     */
    describe('GET /api/users/:userid', () => {
        it('it should GET a user by given id', (done) => {
            completeUser.save((err, act) => {
                chai.request(app)
                    .get('/api/users/' + completeUser.id)
                    .send(completeUser)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.status.should.be.eql('success');
                        res.body.data.docs.should.have.property('email');
                        res.body.data.docs.should.have.property('firstName');
                        res.body.data.docs.should.have.property('lastName');
                        res.body.data.docs.should.have.property('phoneNumber');
                        res.body.data.docs.should.have.property('passwordHash');
                        res.body.data.docs.should.have.property('isAdmin');
                        res.body.data.docs.should.have.property('isConfirm');
                        res.body.data.docs.should.have.property('profileImageUrl');
                        res.body.data.docs.should.have.property('created_at');
                        res.body.data.docs.should.have.property('updated_at');
                        done();
                    });
            });
        });
    });

    /**
     * Test the /PUT/:userid route
     */
    describe('PUT /api/users/:userid', () => {
        it('it should UPDATE a user by given id', (done) => {
            let updateUser = new user({
                email: 'garbage-hunter@gmail.com',
                firstName: 'Garbage',
                lastName: 'Hunter',
                phoneNumber: 3454642,
                passwordHash: 'NDFKJdfkjdf3498dfjkdnNDJF34',
                isAdmin: true,
                isConfirm: true,
                profileImageUrl: `http//:test.com`,
            });
            updateUser.save((err, act) => {
                chai.request(app)
                    .put('/api/users/' + updateUser.id)
                    .send({
                        email: 'admin@garbagehunter.com',
                        firstName: 'Admin',
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.status.should.be.eql('success');
                        res.body.data.docs.email.should.be.not.eql(updateUser.email);
                        res.body.data.docs.email.should.be.eql('admin@garbagehunter.com');
                        res.body.data.docs.firstName.should.be.not.eql(updateUser.firstName);
                        res.body.data.docs.firstName.should.be.eql('Admin');
                        res.body.data.docs.lastName.should.be.eql(updateUser.lastName);
                        res.body.data.docs.phoneNumber.should.be.eql(updateUser.phoneNumber);
                        res.body.data.docs.isAdmin.should.be.eql(updateUser.isAdmin);
                        res.body.data.docs.isConfirm.should.be.eql(updateUser.isConfirm);
                        done();
                    });
            });
        });
    });

    /**
     * Test the /DELETE/:userid route
     */
    describe('DELETE /api/users/:userid', () => {
        it('it should DELETE a user by given id', (done) => {
            let deleteUser = new user({
                email: 'garbage-hunter@gmail.com',
                firstName: 'Garbage',
                lastName: 'Hunter',
                phoneNumber: 3454642,
                passwordHash: 'NDFKJdfkjdf3498dfjkdnNDJF34',
                isAdmin: true,
                isConfirm: true,
                profileImageUrl: `http//:test.com`,
            });
            deleteUser.save((err, act) => {
                chai.request(app)
                    .delete('/api/users/' + deleteUser.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.data.status.should.be.eql('success');
                        res.body.data.docs.email.should.be.eql(deleteUser.email);
                        res.body.data.docs.firstName.should.be.eql(deleteUser.firstName);
                        res.body.data.docs.lastName.should.be.eql(deleteUser.lastName);
                        res.body.data.docs.phoneNumber.should.be.eql(deleteUser.phoneNumber);
                        res.body.data.docs.isAdmin.should.be.eql(deleteUser.isAdmin);
                        res.body.data.docs.isConfirm.should.be.eql(deleteUser.isConfirm);
                        done();
                    });
            });
        });
    });
    /**
     * Test the POST /api/users/delete_all
     */
    describe('POST /api/users/delete_all', () => {
        it('it should DELETE all users', (done) => {
            chai.request(app)
                .post('/api/users')
                .send(completeUser)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.data.status.should.be.eql('success');
                    res.body.data.docs.should.be.a('object');
                    res.body.data.docs.email.should.be.eql(completeUser.email);
                    res.body.data.docs.firstName.should.be.eql(completeUser.firstName);
                });
            // TODO items.should.be.eql(1) is not the same! find out why!
            // chai.request(app)
            //     .get('/api/users')
            //     .end((err, res) => {
            //         res.should.have.status(200);
            //         res.body.should.be.a('object');
            //         res.body.data.status.should.be.eql('success');
            //         res.body.data.items.should.be.eql(1);
            //         res.body.data.docs.should.be.a('array');
            //     });
            chai.request(app)
                .delete('/api/users/delete_all')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.status.should.be.eql('success');
                    res.body.data.message.should.be.eql('all users are deleted');
                    done();
                });
        });
    });

    /**
     * Test the GET /api/users/download
     */
    describe('GET /api/users/download', () => {
        it('it should GET all users in a CSV data', (done) => {
            chai.request(app)
                .get('/api/users/download')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.header['content-disposition'].should.be.eql('attachment; filename="all_users.csv"');
                    res.header['content-type'].should.be.eql('text/csv; charset=utf-8');
                    done();
                });
        });
    });
});
