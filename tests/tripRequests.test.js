/* eslint-disable linebreak-style */
import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import uuid from 'uuid/v4';
import { createToken } from '../src/modules/tokenProcessor';
import app from '../src';

import model from '../src/models';

const { User } = model;

chai.use(chaiHttp);

describe('Trip Request CRUD', () => {
  const testUser = {
    uuid: uuid(),
    name: 'John Doe',
    email: 'helloworld@gmail.com',
    password: 'workingwithseeds',
    role: 'employee',
    is_verified: true,
    gender: 'male',
    date_of_birth: '2019-08-28',
    department: 'research',
    preferred_language: 'french',
    preferred_currency: 'FCFA',
    image_url: 'http://images.com/myimagefile',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  before(async () => {
    await User.create(testUser);
  });
  after(() => User.destroy({ where: {}, force: true }));

  const token = createToken(testUser);
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
