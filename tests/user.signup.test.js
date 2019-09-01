import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

chai.use(chaiHttp);

describe('User Signup Tests POST: /api/v1/auth/signup', () => {
  it('Should return success for signup', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'wokoro@yahoo.com',
        name: 'Douye Samuel Wokoro',
        password: 'Djkladjkaldfj129',
      })
      .end((err, res) => {
        expect(res.status).eql(201);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('success');
        expect(res.body.data.message).to.eql('User account created successfully');
        done();
      });
  });

  it('Should display an error message of name field is required', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: '',
        name: '',
        password: '',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(422);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.have.all.keys('name', 'email', 'password');
        done();
      });
  });

  it('Should display an error message of name should contain only alphabets', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'giftabobo@gmail.com',
        name: 'bles33',
        password: 'Blesn sing9',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(422);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.have.property('name');
        done();
      });
  });

  it('Should display an error message of last name should contain only alphabets', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'giftabobo@gmail.com',
        name: 'Gift7',
        password: 'Blessing9',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(422);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.have.property('name');
        done();
      });
  });

  it('Should display an error message of password should be at least eight characters', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'giftabobo@gmail.com',
        name: 'Abobo',
        password: 'Bless',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(422);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.have.property('password');
        done();
      });
  });

  it('Should display an error message of password should contain at least one Uppercase letter, one lowercase letter, and at least one digit', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'giftabobo@gmail.com',
        name: 'Gift',
        password: 'Blessing',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(422);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.have.property('password');
        done();
      });
  });

  it('Should display an error message of email should be of the form; example@ymail.com', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'giftabobo@gmail',
        name: 'Gift',
        password: 'Blessing9',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(422);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.have.property('email');
        done();
      });
  });
});
