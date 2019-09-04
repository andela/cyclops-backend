import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { createToken } from '../src/modules/tokenProcessor';
import app from '../src/index';
import model from '../src/models';
import { req, res } from './mock.data';
import authController from '../src/controllers/AuthController';
import userRepository from '../src/repositories/UserRepository';

chai.use(sinonChai);

const { User } = model;

chai.use(chaiHttp);

describe('User profile tests', () => {
  const next = sinon.spy();
  before(() => {
    sinon.stub(res, 'send').returnsThis();
    sinon.stub(res, 'status').returnsThis();
  });
  after(() => {
    User.destroy({ where: {}, force: true });
    sinon.restore();
  });
  it('Should return user details', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'wokorosam@yahoo.com',
        name: 'Wokoro Douye Samuel',
        password: 'Ssmsmsmmsm199',
      })
      .then(() => {
        chai.request(app)
          .get('/api/v1/user')
          .set('authorization', `Bearer ${createToken({ email: 'wokorosam@yahoo.com' })}`)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.eql('success');
            expect(res.body.data).to.be.an('object');
            done();
          });
      });
  });
  it('it should return user not found', (done) => {
    chai.request(app)
      .get('/api/v1/user')
      .set('authorization', `Bearer ${createToken({ email: 'wokorouel@yahoo.com' })}`)
      .end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.eql('User not found');
        expect(res.body.status).to.eql('error');
        done();
      });
  });
  it('it should return updated user info', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'douyesamuel@yahoo.com',
        name: 'Wokoro Douye Samuel',
        password: 'Ssmsmsmmsm199',
      })
      .then(() => {
        chai.request(app)
          .put('/api/v1/user')
          .send({
            email: 'douyesamuel@yahoo.com',
            name: 'Benjamin'
          })
          .set('authorization', `Bearer ${createToken({ email: 'douyesamuel@yahoo.com' })}`)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.eql('success');
            expect(res.body.data).to.be.an('object');
            expect(res.body.data.email).to.eql('douyesamuel@yahoo.com');
            done();
          });
      });
  });
  it('it should trigger error handler for server errors', () => {
    sinon.stub(userRepository, 'social').throws();
    authController.social(req, res, next);
    expect(next.called).to.be.true;
    userRepository.social.restore();
  });
});
