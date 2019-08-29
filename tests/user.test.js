import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import uuid from 'uuid';

import app from '../src/index';
import model from '../src/models';

const { User } = model;
const newUser = [{
  uuid: uuid(),
  name: 'Justin',
  email: 'efejustin3@gmail.com',
  password: '$2b$06$9PXuJTiU/uSbRTSaag5NW.OsY.iq9rVI/.Q4qGOhmIAnxtsDpk9W2',
  is_verified: true
}, {
  uuid: uuid(),
  name: 'Makaraba',
  email: 'blessingmakaraba@gmail.com',
  is_verified: false,
  password: '$2b$06$9PXuJTiU/uSbRTSaag5NW.OsY.iq9rVI/.Q4qGOhmIAnxtsDpk9W2'
}];

chai.use(chaiHttp);

describe('User', () => {
  after(() => User.destroy({ where: {}, force: true }));

  it('Should return success for signup POST: /auth/signup', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'wokoro@yahoo.com',
        name: 'Douye Samuel',
        password: 'Djkladjkaldfj129',
      })
      .end((err, res) => {
        expect(res.status).eql(201);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('success');
        expect(res.body.data).to.eql('User account created successfully');
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
        expect(res.body.error).to.be.have.all.keys('name', 'email', 'password');
        done();
      });
  });

  it('Should display an error message of name should contain only alphabets', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'giftabobo@gmail.com',
        name: 'bles33',
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

  describe('User', () => {
    before(async () => {
      await User.bulkCreate(newUser);
    });
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
          email: 'blessingmakaraba@gmail.com',
          password: 'Jei12345',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
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
});
