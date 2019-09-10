import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import verifyRoles from '../src/middlewares/verifyRoles';

chai.use(chaiHttp);

chai.use(sinonChai);

describe('User Role Settings tests', () => {
  describe('Unit test verifyRoles and verifyPermissions middlewares', () => {
    it('All Role verification middlewares should return a function', (done) => {
      expect(verifyRoles.verifySupAdmin).to.be.a('function');
      expect(verifyRoles.verifyRequester).to.be.a('function');
      done();
    });
  });

  let supAdminToken, RequesterToken;
  before('Sign in a Super Administrator', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'awamail@gmail.com',
        password: 'Workingwith1seed'
      })
      .end((err, res) => {
        supAdminToken = `Bearer ${res.body.data.token}`;
        done();
      });
  });
  before('Sign in a Requester', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'Jessica_Bins@hotmail.com',
        password: 'Password123',
      })
      .end((err, res) => {
        RequesterToken = `Bearer ${res.body.data.token}`;
        done();
      });
  });
  it('Should get all users if role of logged in user is Super Administrator', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .set('Authorization', supAdminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data').to.be.an('array');
        done();
      });
  });
  it('Should fetch a user by email if logged in user is Super Administrator', (done) => {
    chai.request(app)
      .get('/api/v1/users/Jessica_Bins@hotmail.com')
      .set('Authorization', supAdminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data').to.be.an('object');
        done();
      });
  });
  it('Should fail to fetch a user by email if role is not super administrator', (done) => {
    chai.request(app)
      .get('/api/v1/users/Jessica_Bins@hotmail.com')
      .set('Authorization', RequesterToken)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.status).eql('error');
        expect(res.body.error).eql('Unauthorized access');
        done();
      });
  });
  it('Should fail to fetch users if role is not super administrator', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .set('Authorization', RequesterToken)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.status).eql('error');
        expect(res.body.error).eql('Unauthorized access');
        done();
      });
  });
  it('Should fail to assign roles if user is not Super Administrator', (done) => {
    chai.request(app)
      .put('/api/v1/admin/assign_role')
      .set('Authorization', RequesterToken)
      .send({
        email: 'Jessica_Bins@hotmail.com',
        role: 'Manager'
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.status).eql('error');
        expect(res.body.error).eql('Unauthorized access');
        done();
      });
  });
  it('Should assign roles if user is Super Administrator', (done) => {
    chai.request(app)
      .put('/api/v1/admin/assign_role')
      .set('Authorization', supAdminToken)
      .send({
        email: 'Jessica_Bins@hotmail.com',
        role: 'Manager'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).eql('Success');
        expect(res.body.message).eql('New role assigned to Jessica_Bins@hotmail.com');
        done();
      });
  });
  it('Should fail to assign permissions if user is not Super Administrator', (done) => {
    chai.request(app)
      .put('/api/v1/admin/assign_permission')
      .set('Authorization', RequesterToken)
      .send({
        role: 'Manager',
        permission: 'create'
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.status).eql('error');
        expect(res.body.error).eql('Unauthorized access');
        done();
      });
  });
  it('Should assign permissions if user is Super Administrator', (done) => {
    chai.request(app)
      .put('/api/v1/admin/assign_permission')
      .set('Authorization', supAdminToken)
      .send({
        role: 'Manager',
        permission: 'create'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).eql('Success');
        expect(res.body.message).eql('create permission assigned to Manager successfully');
        done();
      });
  });
});
