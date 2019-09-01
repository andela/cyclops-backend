import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { createToken } from '../src/modules/tokenProcessor';
import app from '../src/index';


chai.use(chaiHttp);

describe('User Profile View Tests GET: /api/v1/user', () => {
  it('it should return user details', (done) => {
    chai.request(app)
      .post('/api/v1/user')
      .send({
        name: 'Efe Justin',
        email: 'efejustin3@gmail.com',
        password: 'Sameul199'
      })
      .then(() => {
        chai.request(app)
          .get('/api/v1/user')
          .set('authorization', `Bearer ${createToken({ email: 'efejustin3@gmail.com' })}`)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.eql('success');
            expect(res.body.data).to.be.an('object');
            done();
          });
      });
  });
  it('it should return Unauthorize for invalid user', (done) => {
    chai.request(app)
      .get('/api/v1/user')
      .set('authorization', `Bearer ${createToken({ email: 'jaklfajl@gmail.com' })}`)
      .end((err, res) => {
        expect(res.status).to.eql(403);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.eql('Unauthorized');
        expect(res.body.status).to.eql('error');
        done();
      });
  });
});
