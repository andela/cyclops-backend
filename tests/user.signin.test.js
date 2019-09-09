import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

chai.use(chaiHttp);

describe('User Signin Tests POST: /api/v1/auth/signin', () => {
  it('Should return success for signin', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'efejustin3@gmail.com',
        password: 'Jei12345',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });

  it('shouild not signin unregistered user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'nonsoamos@gmail.com',
        password: 'Bjul4454',
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.eql('error');
        done();
      });
  });

  it('shouild not signin a user whose is not verified', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'blessingpeople@gmail.com',
        password: 'Bloated36',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(401);
        expect(res.body.status).to.eql('error');
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('shouild not signin a user with incorrect password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'efejustin3@gmail.com',
        password: 'Bjul445478',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(400);
        expect(res.body.status).to.eql('error');
        done();
      });
  });
});
