import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import passToken from '../src/middlewares';
import {
  req, res, emptyTokenReq, invalidTokenReq
} from './mock.data';

chai.use(sinonChai);

describe('Token Parser', () => {
  const next = sinon.spy();
  before(() => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(res, 'send').returnsThis();
  });
  it('It should call next for valid token', () => {
    passToken(req, res, next);
    expect(next.called).to.be.true;
  });
  it('It should return error for empty token', () => {
    passToken(emptyTokenReq, res, next);
    expect(res.status).to.have.been.calledWith(401);
    expect(res.send).to.be.calledWith({
      status: 'error',
      error: 'Authorization Failed',
    });
  });
  it('It should return error for invalid token', () => {
    passToken(invalidTokenReq, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.send).to.be.calledWith({
      status: 'error',
      error: 'Invalid token',
    });
  });
});
