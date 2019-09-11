import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { setHeaders, addHook, getUserInfo } from '../src/utils/NotificationHelpers';
import { req, res, model } from './mock.data';

chai.use(sinonChai);

describe('Notification Helper methods tests', () => {
  describe('Header setter', () => {
    before(() => {
      sinon.stub(res, 'write').returnsThis();
      sinon.stub(res, 'writeHead').returnsThis();
    });
    after(() => { sinon.restore(); });
    it('it should set SSE headers', async () => {
      setHeaders(req, res);
      expect(res.writeHead).to.be.calledWith(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive'
      });
    });
    it('it should send newline character', async () => {
      setHeaders(req, res);
      expect(res.write).to.be.calledWith('\n');
    });
  });
  describe('Hook setter', () => {
    after(() => { sinon.restore(); });
    before(() => {
      sinon.spy(model, 'addHook');
    });
    it('it should set hook event on model', async () => {
      addHook(model, 'afterCreate', 'notification', () => {});
      expect(model.addHook.called).to.be.true;
    });
  });
  describe('User info getter', () => {
    after(() => { sinon.restore(); });
    it('it should return multiple user information', async () => {
      const details = getUserInfo(model, ['uuid', 'email']);
      expect(details).to.be.an('object');
      expect(details).to.have.property('uuid');
      expect(details).to.have.property('email');
    });
    it('it should return single user info(s)', async () => {
      const details = getUserInfo(model, 'uuid');
      expect(details).to.be.an('object');
      expect(details).to.have.property('uuid');
    });
  });
});
