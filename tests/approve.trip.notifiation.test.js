
import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { createToken } from '../src/modules/tokenProcessor';
import app from '../src';


chai.use(chaiHttp);
describe('Approve trip request with notification', () => {
  const token1 = {
    uuid: '0ee072c5-0b45-4991-b703-57a64af32da0',
    email: 'nomail@yahoo.com',
    role: 'Manager'
  };
  const token2 = {
    email: 'dieudonneawa7@gmail.com',
    role: 'Super Administrator',
  };
  const token3 = {
    email: 'blessingpeople@gmail.com',
    role: 'Manager',
  };
  const UserToken = createToken(token2);
  const tokenManager = createToken(token1);
  const tokenManagerThree = createToken(token3);
 
  describe('Approves User trips request PATCH /api/v1/trips/approve/', () => {
    it('Should approve a user trip rquest', (done) => {
      chai.request(app)
        .patch('/api/v1/trips/approve/16187eee-9ccd-4178-b848-4c2d468f690c')
        .set('Content-Type', 'Application/json')
        .set('authorization', `Bearer ${tokenManager}`)
        .end((err, res) => {
          expect(res.status).eql(200);
          expect(res.body.status).to.eql('success');
          done();
        });
    });
    it(' Should return an error when the user role is not a manager', (done) => {
      chai.request(app)
        .patch('/api/v1/trips/approve/16187eee-9ccd-4178-b848-4c2d468f690c')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${UserToken}`)
        .end((err, res) => {
          expect(res.status).eql(403);
          expect(res.body.status).to.eql('error');
          done();
        });
    });
    it('Should return error when the trip can not be found', (done) => {
      chai.request(app)
        .patch('/api/v1/trips/approve/95ccd25d-2524-4b95-a441-8e2643c4c077')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${tokenManager}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.eql('error');
          done();
        });
    });
    it('Should return error when the user\'s manager is not the one authorizing the request', (done) => {
      chai.request(app)
        .patch('/api/v1/trips/approve/16187eee-9ccd-4178-b848-4c2d468f690c')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${tokenManagerThree}`)
        .end((err, res) => {
          expect(res.status).to.be.eql(401);
          expect(res.body.status).to.eql('error');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should return only pending or open trips can be approve', (done) => {
      chai.request(app)
        .patch('/api/v1/trips/approve/16187eee-9ccd-4178-b848-4c2d468f690c')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${tokenManager}`)
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.body.status).to.eql('error');
          done();
        });
    });
  });
});
