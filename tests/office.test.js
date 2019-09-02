import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { createToken } from '../src/modules/tokenProcessor';
import app from '../src';

chai.use(chaiHttp);

const seededUser = {
  uuid: '95ccd25d-2524-4b95-a441-8e2643c4c077',
  email: 'Jessica_Bins@hotmail.com',
  name: 'Name Hettinger'
};

describe('Trip Request CRUD', () => {
  const token = createToken(seededUser);
  it('Should create a returnTrip for a user', (done) => {
    chai.request(app)
      .get('/api/v1/office')
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.data).to.be.an('array');
        done();
      });
  });
});
