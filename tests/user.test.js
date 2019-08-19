import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

chai.use(chaiHttp);

describe('User', () => {
  it('Should return success for signup', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('success');
        done();
      });
  });

  it('Should return success for signin', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('success');
        done();
      });
  });

  it('Should return success for user', (done) => {
    chai.request(app)
      .get('/api/v1/auth')
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('success');
        done();
      });
  });
});
