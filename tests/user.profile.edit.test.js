import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiHttp from 'chai-http';
import authController from '../src/controllers/AuthController';
import userRepo from '../src/repositories/UserRepository';
import { req, res, signUpReq } from './mock.data';

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
    sinon.stub(userRepo, 'getOne').returns(false);
    await authController.update(signUpReq, res, next);
    expect(res.status).to.be.calledWith(200);
    expect(res.status).to.be.calledWith(200);
    expect(res.send).to.be.calledWith({
      status: 'success',
      data: 'No edit made'
    });
    userRepo.update.restore();
    userRepo.getOne.restore();
  });
  it('it should call next for server side errors', (done) => {
    const next = sinon.spy();
    sinon.stub(userRepo, 'getOne').returns(false);
    sinon.stub(userRepo, 'update').throws();
    expect(authController.update(req, res, next)).to.throw;
    expect(next.called).to.be.true;
    userRepo.getOne.restore();
    userRepo.update.restore();
    done();
  });
  it('it should return updated user info', async () => {
    const next = sinon.spy();
    sinon.stub(userRepo, 'update').returns([1, [{ dataValues: {} }]]);
    sinon.stub(userRepo, 'getOne').returns(false);
    await authController.update(signUpReq, res, next);
    expect(res.status).to.be.calledWith(200);
    expect(res.send).to.be.calledWith({
      status: 'success',
      data: {}
    });
    userRepo.update.restore();
    userRepo.getOne.restore();
  });
  it('it should return user already exist error', async () => {
    const next = sinon.spy();
    sinon.stub(userRepo, 'update').returns([1, [{ dataValues: {} }]]);
    sinon.stub(userRepo, 'getOne').returns(true);
    await authController.update(signUpReq, res, next);
    expect(res.status).to.be.calledWith(409);
    expect(res.send).to.be.calledWith({
      status: 'error',
      error: 'User wokorosamuel@yahoo.com already exists'
    });
    userRepo.update.restore();
    userRepo.getOne.restore();
  });
});
