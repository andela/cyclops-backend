import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

chai.use(chaiHttp);

describe('Server Tests', () => {
  it('Should display "Welcome to the Cyclops Barefoot Nomad backend API"', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('success');
        expect(res.body.data).to.eql('Welcome to the Cyclops Barefoot Nomad backend API');
        done();
      });
  });

  it('Should display "This route is unavailable on this serve for GET method"', (done) => {
    chai.request(app)
      .get('/api/v1/hjhjh')
      .end((err, res) => {
        expect(res.status).eql(404);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.eql('This route is unavailable on this server');
        done();
      });
  });

  it('Should display "This route is unavailable on this serve for POST method"', (done) => {
    chai.request(app)
      .post('/api/v1/hjhjh')
      .end((err, res) => {
        expect(res.status).eql(404);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.eql('This route is unavailable on this server');
        done();
      });
  });

  it('Should display a "This route is unavailable on this serve for PATCH method"', (done) => {
    chai.request(app)
      .patch('/api/v1/hjhjh')
      .end((err, res) => {
        expect(res.status).eql(404);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.eql('This route is unavailable on this server');
        done();
      });
  });

  it('Should display "This route is unavailable on this serve for DELETE method"', (done) => {
    chai.request(app)
      .delete('/api/v1/hjhjh')
      .end((err, res) => {
        expect(res.status).eql(404);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.eql('This route is unavailable on this server');
        done();
      });
  });
});
