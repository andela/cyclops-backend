import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

chai.use(chaiHttp);

describe('User', () => {
  it('Should return success for signup', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: '  giftabobo@gmail.com  ',
        first_name: ' Bles ',
        last_name: 'Abobo',
        password: 'Blessing9',
      })
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('success');
        done();
      });
  });

<<<<<<< HEAD
<<<<<<< HEAD
  it('Should display an error message of first name should contain only alphabets', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(422);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.be.have.all.keys('first_name', 'last_name', 'email', 'password');
        done();
      });
  });

  it('Should display an error message of first name should contain only alphabets', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'giftabobo@gmail.com',
        first_name: 'bles33',
        last_name: 'Abobo',
        password: 'Blessing9',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(422);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.have.property('first_name');
        done();
      });
  });

  it('Should display an error message of last name should contain only alphabets', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'giftabobo@gmail.com',
        first_name: 'Gift',
        last_name: 'Abobo3',
        password: 'Blessing9',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(422);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.have.property('last_name');
        done();
      });
  });

  it('Should display an error message of password should be at least eight characters', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'giftabobo@gmail.com',
        first_name: 'Gift',
        last_name: 'Abobo',
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
        first_name: 'Gift',
        last_name: 'Abobo',
        password: 'Blessing',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(422);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.have.property('password');
=======
  it('Should return success for signin', (done) => {
=======
  it('Should display an error message of first name should contain only alphabets', (done) => {
>>>>>>> ft(user): Validate user data upon sign up (#23)
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(422);
        expect(res.body).to.be.an('object');
<<<<<<< HEAD
        expect(res.body.status).to.eql('success');
>>>>>>> chore(documentation): Setup API documentation with Swagger
=======
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.be.have.all.keys('first_name', 'last_name', 'email', 'password');
>>>>>>> ft(user): Validate user data upon sign up (#23)
        done();
      });
  });

<<<<<<< HEAD
<<<<<<< HEAD
  it('Should display an error message of email should be of the form; example@ymail.com', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'giftabobo@gmail',
        first_name: 'Gift',
        last_name: 'Abobo',
        password: 'Blessing9',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(422);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.have.property('email');
=======
  it('Should return success for user', (done) => {
=======
  it('Should display an error message of first name should contain only alphabets', (done) => {
>>>>>>> ft(user): Validate user data upon sign up (#23)
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'giftabobo@gmail.com',
        first_name: 'bles33',
        last_name: 'Abobo',
        password: 'Blessing9',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(422);
        expect(res.body).to.be.an('object');
<<<<<<< HEAD
        expect(res.body.status).to.eql('success');
>>>>>>> chore(documentation): Setup API documentation with Swagger
=======
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.have.property('first_name');
        done();
      });
  });

  it('Should display an error message of last name should contain only alphabets', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'giftabobo@gmail.com',
        first_name: 'Gift',
        last_name: 'Abobo3',
        password: 'Blessing9',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(422);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.have.property('last_name');
        done();
      });
  });

  it('Should display an error message of password should be at least eight characters', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'giftabobo@gmail.com',
        first_name: 'Gift',
        last_name: 'Abobo',
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
        first_name: 'Gift',
        last_name: 'Abobo',
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
        first_name: 'Gift',
        last_name: 'Abobo',
        password: 'Blessing9',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(422);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.have.property('email');
>>>>>>> ft(user): Validate user data upon sign up (#23)
        done();
      });
  });
});
