import { describe, it } from 'mocha';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import CommentNotificationController from '../src/controllers/CommentNotificationController';
import {req, res, next} from './mock.data';
import NotificationRepository from '../src/repositories/NotificationRepository';
import tripRepository from '../src/repositories/TripRequestRepository';

chai.use(chaiHttp);
chai.use(sinonChai);

describe('Comment notification', () => {
  
  before(()=>{
    sinon.spy(res, 'writeHead');
    sinon.spy(res, 'write');
  });

  after(()=>{ sinon.restore(); });

  it('it should set headers should be set', ()=>{
    CommentNotificationController.create(req, res, next);
    expect(res.writeHead).to.be.calledWith(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    });
    expect(res.write).to.be.calledWith('\n');
  });

  it('it should return unread comments', ()=>{
  
    sinon.stub(NotificationRepository, 'getAll').returns([
      {
        uuid: 'abef6009-48be-4b38-80d0-b38c1bc39922',
        user_uuid: 'abef6009-48be-4b38-80d0-b38c1bc39922',
        message: 'Please i need my trip request approved',
        status: 'unread',
        notification_type: 'comment',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
    CommentNotificationController.create(req, res, next);
    expect(res.write.called).to.be.true;
    NotificationRepository.getAll.restore();
  });

  it('it should call next function for server error', ()=>{
    sinon.stub(NotificationRepository, 'getAll').throws();
    expect(CommentNotificationController.create).throws
    NotificationRepository.getAll.restore();
  });
});
