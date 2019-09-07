import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { createToken } from '../src/modules/tokenProcessor';
import app from '../src';

chai.use(chaiHttp);

const seededUser = {
  uuid: '95ccd25d-2524-4b95-a441-8e2643c4c077',
  email: 'Jessica_Bins@hotmail.com',
  name: 'Name Hettinger',
  role: 'Requester'
};

const seededUserI = {
  uuid: '95ccd25d-2524-4b95-a441-8e2643c4c072',
  name: 'Efe Justin',
  email: 'efejustin3@gmail.com',
  role: 'Manager'
};

const seededUserII = {
  uuid: '95ccd25d-2524-4b95-a441-8e2643c4c072',
  name: 'Efe Just',
  email: 'efejustin@gmail.com',
  role: 'Requester',
};

let commentUuid;
const fakeCommentUuid = '95ccd25d-2524-4b95-a441-8e2643c4c072';
describe('Trip Request CRUD', () => {
  const token = createToken(seededUser);
  const tokenI = createToken(seededUserI);
  const tokenII = createToken(seededUserII);

  describe('Create comment POST /api/v1/comment/trips', () => {
    it('Should create a comment on a trip request', (done) => {
      chai.request(app)
        .post('/api/v1/comment/trips')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({
          trip_request_uuid: '95ccd25d-2524-4b95-a441-8e2643c4c075',
          message: 'Please my request is waiting approval'
        })
        .end((err, res) => {
          expect(res.status).to.eql(201);
          expect(res.body.status).to.eql('success');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.all.keys('uuid', 'trip_request_uuid', 'message', 'user_uuid', 'updatedAt', 'createdAt', 'deletedAt');
          commentUuid = res.body.data.uuid;
          done();
        });
    });

    it('Should return an error is message field is empty', (done) => {
      chai.request(app)
        .post('/api/v1/comment/trips')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({
          trip_request_uuid: '95ccd25d-2524-4b95-a441-8e2643c4c075',
          message: ''
        })
        .end((err, res) => {
          expect(res.status).to.eql(422);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.be.an('object');
          expect(res.body.error).to.have.key({ message: 'message is required' });
          done();
        });
    });


    it('Should return an error if the user is not the manager of the user that created the trip request', (done) => {
      chai.request(app)
        .post('/api/v1/comment/trips')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${tokenI}`)
        .send({
          trip_request_uuid: '95ccd25d-2524-4b95-a441-8e2643c4c075',
          message: 'Please my request is waiting approval'
        })
        .end((err, res) => {
          expect(res.status).to.eql(403);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.be.eql('You are not the manager of the user that created this trip request');
          done();
        });
    });


    it('Should return an error if the user is not the one that created the trip request', (done) => {
      chai.request(app)
        .post('/api/v1/comment/trips')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${tokenII}`)
        .send({
          trip_request_uuid: '95ccd25d-2524-4b95-a441-8e2643c4c075',
          message: 'Please my request is waiting approval'
        })
        .end((err, res) => {
          expect(res.status).to.eql(403);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.be.eql('You can\'t comment on a trip request you did not create');
          done();
        });
    });

    it('Should return an error if the trip request does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/comment/trips')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({
          trip_request_uuid: '95ccd25d-2524-4b95-a441-8e2643c4c076',
          message: 'Please my request is waiting approval'
        })
        .end((err, res) => {
          expect(res.status).to.eql(404);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.be.eql('This trip request does not exist');
          done();
        });
    });
  });

  describe('Edit comment PUT /api/v1/comment/trips/{uuid}', () => {
    it('Should update a comment', (done) => {
      chai.request(app)
        .put(`/api/v1/comment/trips/${commentUuid}`)
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({
          message: 'Please my request is waiting approval'
        })
        .end((err, res) => {
          expect(res.status).to.eql(200);
          expect(res.body.status).to.eql('success');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.be.have.all.keys('uuid', 'user_uuid', 'trip_request_uuid', 'message', 'createdAt', 'updatedAt', 'deletedAt');
          done();
        });
    });

    it('Should return an error if comment does not exist', (done) => {
      chai.request(app)
        .put(`/api/v1/comment/trips/${fakeCommentUuid}`)
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({
          message: 'Please my request is waiting approval'
        })
        .end((err, res) => {
          expect(res.status).to.eql(404);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.be.eql('This comment does not exist');
          done();
        });
    });
  });

  describe('Delete comment DELETE /api/v1/comment/trips/{uuid}', () => {
    it('Should return an error - comment does not exist', (done) => {
      chai.request(app)
        .delete(`/api/v1/comment/trips/${fakeCommentUuid}`)
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.status).to.eql(404);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.be.eql('This comment does not exist');
          done();
        });
    });

    it('Should not delete comment and return error if comment does not belong to user', (done) => {
      chai.request(app)
        .delete(`/api/v1/comment/trips/${commentUuid}`)
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${tokenI}`)
        .end((err, res) => {
          expect(res.status).to.eql(401);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.be.eql('You are not allowed to perform this action');
          done();
        });
    });

    it('Should delete a comment', (done) => {
      chai.request(app)
        .delete(`/api/v1/comment/trips/${commentUuid}`)
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.status).to.eql(200);
          expect(res.body.data.message).to.be.eql('Comment deleted successful');
          done();
        });
    });
  });
});
