import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

chai.use(chaiHttp);

describe('App', () => {
  it('Should display a Welcome to the Cyclops Barefoot Nomad backend API', (done) => {
    chai.request(app)
      .get('/api/v1')
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('success');
        expect(res.body.data).to.eql('Welcome to the Cyclops Barefoot Nomad backend API');
        done();
      });
  });

  it('Should display a This route is unavailable on this serve', (done) => {
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
});
