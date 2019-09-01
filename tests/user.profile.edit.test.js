import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { createToken } from '../src/modules/tokenProcessor';
import app from '../src/index';


chai.use(chaiHttp);

describe('User Profile Edit Tests PUT: /api/v1/user', () => {
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
            email: 'wokorosamuel@yahoo.com',
            name: 'Elijah'
          })
          .set('authorization', `Bearer ${createToken({ email: 'douyesamuel@yahoo.com' })}`)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.eql('success');
            expect(res.body.data).to.be.an('object');
            expect(res.body.data.email).to.eql('wokorosamuel@yahoo.com');
            done();
          });
      });
  });
});
