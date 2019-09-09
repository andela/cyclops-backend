import { describe, it } from 'mocha';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { createToken } from '../src/modules/tokenProcessor';
import app from '../src';
import userRepo from '../src/repositories/UserRepository';

chai.use(sinonChai);
chai.use(chaiHttp);

const requester = {
  uuid: '95ccd25d-2524-4b95-a441-8e2643c4c077',
  email: 'Jessica_Bins@hotmail.com',
  name: 'Name Hettinger',
  role: 'Requester'
};
const tavelTeamMember = {
  uuid: '95dcd25d-2524-4b95-a541-8e2643d4c077',
  email: 'thetravelteammember@barefoot.com',
  name: 'The Travel team member',
  role: 'Travel Team Member'
};
const travelAdmin = {
  uuid: '95dcd25d-2524-4b95-a541-8e2643d4c077',
  email: 'thetraveladmin@barefoot.com',
  name: 'The Travel Admin',
  role: 'Travel Administrator'
};

describe('Trip Request CRUD', () => {
  const requesterToken = createToken(requester);
  const tavelTeamMemberToken = createToken(tavelTeamMember);
  const travelAdminToken = createToken(travelAdmin);
  it('Should create a returnTrip for a user', (done) => {
    sinon.stub(userRepo, 'getOne').returns([]);
    chai.request(app)
      .get('/api/v1/office')
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${requesterToken}`)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.data).to.be.an('array');
        sinon.restore();
        done();
      });
  });
  it('Should Not create returnTrip for a user if logged in user is Travel team member', (done) => {
    chai.request(app)
      .get('/api/v1/office')
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${tavelTeamMemberToken}`)
      .end((err, res) => {
        expect(res.status).to.eql(403);
        expect(res.body.status).eql('error');
        expect(res.body).to.have.property('error').eql('Unauthorized');
        done();
      });
  });
  it('Should Not create returnTrip for a user if logged in user is Travel Administrator', (done) => {
    chai.request(app)
      .get('/api/v1/office')
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${travelAdminToken}`)
      .end((err, res) => {
        expect(res.status).to.eql(403);
        expect(res.body.status).eql('error');
        expect(res.body).to.have.property('error').eql('Unauthorized');
        done();
      });
  });
});
