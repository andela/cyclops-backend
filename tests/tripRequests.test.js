/* eslint-disable linebreak-style */
import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { createToken } from '../src/modules/tokenProcessor';
import app from '../src';

chai.use(chaiHttp);

const user = {
  role: 'employee',
  uuid: 'abef6009-48be-4b38-80d0-b38c1bc39922',
  email: 'greatness@andela.com',
  name: 'Albert Faith'
};

describe('Trip Request CRUD', () => {
  const token = createToken(user);
  it('Should return user trip records with details', (done) => {
    chai.request(app)
      .get('/api/v1/trips')
      .set('Content-Type', 'Application/json')
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body.status).to.eql('success');
        done();
      });
  });
  it('Should fail to return travel history for non authenticated users', (done) => {
    chai.request(app)
      .get('/api/v1/trips')
      .set('Content-Type', 'Application/json')
      .end((err, res) => {
        expect(res.status).eql(401);
        expect(res.body.status).to.eql('error');
        done();
      });
  });
});
