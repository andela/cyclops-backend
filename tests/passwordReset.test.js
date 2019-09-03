import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import uuId from 'uuid';
import chaiHttp from 'chai-http';

import models from '../src/models';
import app from '../src/app';
import UserRepository from '../src/repositories/UserRepository';
import { createToken } from '../src/modules/tokenProcessor';

const { User } = models;

chai.use(chaiHttp);

describe('Password reset Tests', () => {
  const testData = {
    uuid: uuId.v4(),
    name: 'Awa Dieudonne',
    email: 'dieudonneawa7@gmail.com',
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
    await User.create(testData);
  });
  after(() => User.destroy({ where: {}, force: true }));

  let resetToken, userId;
  const email = 'dieudonneawa7@gmail.com';
  beforeEach(async () => {
    const { uuid } = await UserRepository.getOne({ email });
    resetToken = await createToken({ uuid, email });
    userId = uuid;
  });
  it('"/api/v1/auth/forgotPassword" Should send a reset link if email exists and is valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/forgotPassword')
      .send({ email: 'dieudonneawa7@gmail.com' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status').eql('Success');
        expect(res.body).to.have.property('message').eql('A password reset link has been sent to your mailbox');
        done();
      });
  });
  it('"/api/v1/auth/forgotPassword" Should fail if email is not provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/forgotPassword')
      .send()
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status').eql('error');
        expect(res.body).to.have.property('error').eql('email is required');
        done();
      });
  });
  it('"/api/v1/auth/forgotPassword" Should fail if email is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/forgotPassword')
      .send({ email: 'iaminvalidemail.com' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status').eql('error');
        expect(res.body).to.have.property('error').eql('email is not valid');
        done();
      });
  });
  it('"/api/v1/auth/resetPassword/:uuid/:token" Should fail if password is not provided', (done) => {
    chai.request(app)
      .put(`/api/v1/auth/resetPassword/${userId}/${resetToken}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status').eql('error');
        expect(res.body).to.have.property('error').eql('password is required');
        done();
      });
  });
  it('"/api/v1/auth/resetPassword/:uuid/:token" Should fail if password is invalid', (done) => {
    chai.request(app)
      .put(`/api/v1/auth/resetPassword/${userId}/${resetToken}`)
      .send({ password: 'nouppercasenordigit' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status').eql('error');
        expect(res.body.error).eql('password should contain at least one Uppercase letter, one lowercase letter, and at least one digit with now space');
        done();
      });
  });
  it('"/api/v1/auth/resetPassword/:uuid/:token" Should fail if password length is less than 8', (done) => {
    chai.request(app)
      .put(`/api/v1/auth/resetPassword/${userId}/${resetToken}`)
      .send({ password: 'Nouppe1' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status').eql('error');
        expect(res.body.error).eql('password should be at least eight characters');
        done();
      });
  });
  it('"/api/v1/auth/resetPassword/:uuid/:token" Should pass if token and id matche user token and id', (done) => {
    chai.request(app)
      .put(`/api/v1/auth/resetPassword/${userId}/${resetToken}`)
      .send({ password: 'Mynumber1password' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').eql('Password Reset Successfully');
        done();
      });
  });
});
