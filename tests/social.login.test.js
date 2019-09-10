import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { req, res } from './mock.data';
import authController from '../src/controllers/AuthController';
import userRepository from '../src/repositories/UserRepository';

chai.use(sinonChai);

chai.use(chaiHttp);

describe('User social login tests', () => {
  const next = sinon.spy();
  before(() => {
    sinon.stub(res, 'send').returnsThis();
    sinon.stub(res, 'status').returnsThis();
  });
  after(() => {
    sinon.restore();
  });
  it('it should trigger error handler for server errors', () => {
    sinon.stub(userRepository, 'getOne').throws();
    authController.social(req, res, next);
    expect(next.called).to.be.true;
    userRepository.getOne.restore();
  });
});
