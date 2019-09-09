import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

let userToken;

chai.use(chaiHttp);
describe('User Signout Tests GET: /api/v1/auth/signout', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'efejustin3@gmail.com',
        password: 'Jei12345',
      })
      .end((err, res) => {
        userToken = `Bearer ${res.body.data.token}`;
        done();
      });
  });
  it('should sign user out', (done) => {
    chai.request(app)
      .get('/api/v1/auth/signout')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
