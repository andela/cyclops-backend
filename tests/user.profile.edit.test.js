import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiHttp from 'chai-http';
import { createToken } from '../src/modules/tokenProcessor';
import app from '../src/index';
import authController from '../src/controllers/AuthController';
import userRepo from '../src/repositories/UserRepository';
import { req, res } from './mock.data';

chai.use(sinonChai);

chai.use(chaiHttp);

describe('User Profile Edit Tests PUT: /api/v1/user', () => {
  before(() => {
    sinon.stub(res, 'send').returnsThis();
    sinon.stub(res, 'status').returnsThis();
  });
  after(() => { sinon.restore(); });
  it('it should return no edit made for no edits', async () => {
    const next = sinon.spy();
    sinon.stub(userRepo, 'update').returns([0, [{ dataValue: {} }]]);
    await authController.update(req, res, next);
    expect(res.status).to.be.calledWith(200);
    userRepo.update.restore();
  });
  it('it should return no edit made for no edits', (done) => {
    const next = sinon.spy();
    sinon.stub(userRepo, 'update').throws();
    expect(authController.update(req, res, next)).to.throw;
    userRepo.update.restore();
    done();
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
            email: 'wokorosamuel@yahoo.com',
            name: 'Elijah'
          })
          .set('authorization', `Bearer ${createToken({ email: 'douyesamuel@yahoo.com' })}`)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.eql('success');
            expect(res.body.data).to.be.an('object');
            expect(res.body.data.email).to.eql('wokorosamuel@yahoo.com');
            done();
          });
      });
  });
});
