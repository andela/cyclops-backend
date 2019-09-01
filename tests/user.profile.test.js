import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { createToken } from '../src/modules/tokenProcessor';
import app from '../src/index';
import model from '../src/models';

const { User } = model;

chai.use(chaiHttp);

describe('User profile tests', () => {
  after(() => {
    after(() => User.destroy({ where: {}, force: true }));
  });
  it('it should return user details', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'wokorosamuel@yahoo.com',
        name: 'Wokoro Douye Samuel',
        password: 'Ssmsmsmmsm199',
      })
      .then(() => {
        chai.request(app)
          .get('/api/v1/user')
          .set('authorization', `Bearer ${createToken({ email: 'wokorosamuel@yahoo.com' })}`)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.eql('success');
            expect(res.body.data).to.be.an('object');
            done();
          });
      });
  });
  it('it should return user not found', (done) => {
    chai.request(app)
      .get('/api/v1/user')
      .set('authorization', `Bearer ${createToken({ email: 'wokorouel@yahoo.com' })}`)
      .end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.eql('User not found');
        expect(res.body.status).to.eql('error');
        done();
      });
  });
  it('it should return updated user info', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'douyesamuel@yahoo.com',
        name: 'Wokoro Douye Samuel',
        password: 'Ssmsmsmmsm199',
      })
      .then(() => {
        chai.request(app)
          .put('/api/v1/user')
          .send({
            email: 'douyesamuel@yahoo.com',
            name: 'Benjamin'
          })
          .set('authorization', `Bearer ${createToken({ email: 'douyesamuel@yahoo.com' })}`)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.eql('success');
            expect(res.body.data).to.be.an('object');
            expect(res.body.data.email).to.eql('douyesamuel@yahoo.com');
            done();
          });
      });
  });
});
