import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import model from '../src/models';
import { createToken } from '../src/modules/tokenProcessor';

let userToken;
const { User } = model;

chai.use(chaiHttp);

after(() => User.destroy({ where: {}, force: true }));
describe('User', () => {
  let newUserToken, newUserUuid, verifiedUserToken, verifiedUserUuid;
  before(async () => {
    newUserToken = await createToken({
      uuid: '95ccd25d-2524-4b95-a441-8e2643c4c079',
      email: 'somemail@yahoo.com'
    });
    verifiedUserToken = await createToken({
      uuid: '95ccd25d-2524-4b95-a441-8e2643c4c077',
      email: 'Jessica_Bins@hotmail.com'
    });
  });
  it('Should return success for signup POST: /auth/signup', (done) => {
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
        expect(res.body).to.have.property('data');
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

  it('should verify account if not yet verified', (done) => {
    chai.request(app)
      .get('/api/v1/auth/confirmEmail')
      .query({ uuid: newUserUuid, token: newUserToken })
      .end((err, res) => {
        if (err) throw new Error(err);
        expect(res).to.have.status(200);
        expect(res.body.message).eql('Email verified successfully');
        done();
      });
  });

  it('should fail if account is already verified', (done) => {
    chai.request(app)
      .get('/api/v1/auth/confirmEmail')
      .query({ uuid: verifiedUserUuid, token: verifiedUserToken })
      .end((err, res) => {
        if (err) throw new Error(err);
        expect(res).to.have.status(400);
        expect(res.body.error).eql('Account verified already');
        done();
      });
  });

  describe('User', () => {
    it('Should return success for signin', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'efejustin3@gmail.com',
          password: 'Jei12345',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('data');

          userToken = res.body.data.token;
          done();
        });
    });

    it('shouild not signin unregistered user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'nonsoamos@gmail.com',
          password: 'Bjul4454',
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.eql('error');
          done();
        });
    });

    it('shouild not signin a user whose is not verified', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'blessingpeople@gmail.com',
          password: 'Bloated36',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(401);
          expect(res.body.status).to.eql('error');
          expect(res.body).to.have.property('error');
          done();
        });
    });

    it('shouild not signin a user with incorrect password', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'efejustin3@gmail.com',
          password: 'Bjul445478',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.body.status).to.eql('error');
          done();
        });
    });
  });
  describe('Sign Out', () => {
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
});
