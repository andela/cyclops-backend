import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import uuid from 'uuid/v4';
import sinon from 'sinon';
import { createToken } from '../src/modules/tokenProcessor';
import app from '../src';
import tripReqRepo from '../src/repositories/TripRequestRepository';
import tripController from '../src/controllers/TripRequestController';
import { req, res } from './mock.data';

import model from '../src/models';

const { User } = model;

chai.use(chaiHttp);

describe('Test Create Trip Request', () => {
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
    created_at: new Date(),
    updated_at: new Date()
  };

  const seededUser = {
    uuid: '95ccd25d-2524-4b95-a441-8e2643c4c077',
    email: 'Jessica_Bins@hotmail.com',
    name: 'Name Hettinger',
    role: 'Requester'
  };

  const seededUserI = {
    uuid: '95ccd25d-2524-4b95-a441-8e2643c4c079',
    email: 'efejustin3@gmail.com',
    name: 'Efe Justin',
    role: 'Requester'
  };
  

  before(async () => {
    await User.create(testUser);
  });

  const token = createToken(seededUser);
  const token1 = createToken(seededUserI);
  const token2 = createToken(testUser);

  describe('Trip Request User GET /trips', () => {
    it('Should return user trip records with details', (done) => {
      chai.request(app)
        .get('/api/v1/trips')
        .set('Content-Type', 'Application/json')
        .set('authorization', `Bearer ${token2}`)
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

  describe('Trip Request User POST /trips', () => {
    it('Should tell the user to provide token', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('Content-Type', 'application/json')
        .set('authorization', '')
        .send({
          request_type: 'returnTrip',
          trip_plan: 'singleCity',
          leaving_from: 'dbf285c6-8d7c-4f71-8058-a82e22e27f6b',
          return_date: '09/30/2019',
          travel_date: '09/27/2019',
          destination: '85b4a64e-331b-4051-a32c-6bc20eb0fc81'
        })
        .end((err, res) => {
          expect(res.status).eql(401);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.eql('Please provide a token');
          done();
        });
    });

    it('Should fail user\'s authentication', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}j`)
        .send({
          request_type: 'returnTrip',
          trip_plan: 'singleCity',
          leaving_from: 'dbf285c6-8d7c-4f71-8058-a82e22e27f6b',
          return_date: '09/30/2019',
          travel_date: '09/27/2019',
          destination: '85b4a64e-331b-4051-a32c-6bc20eb0fc81'
        })
        .end((err, res) => {
          expect(res.status).eql(401);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.eql('Authentication Failed');
          done();
        });
    });

    it('Should create a returnTrip for a user', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({
          request_type: 'returnTrip',
          trip_plan: 'singleCity',
          leaving_from: 'dbf285c6-8d7c-4f71-8058-a82e22e27f6b',
          return_date: '09/30/2019',
          travel_date: '09/27/2019',
          destination: '85b4a64e-331b-4051-a32c-6bc20eb0fc81'
        })
        .end((err, res) => {
          expect(res.status).eql(201);
          expect(res.body.status).to.eql('success');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.all.keys('message', 'trip_request_uuid');
          expect(res.body.data.message).to.be.eql('Your trip request has been created successfully');
          done();
        });
    });
    it('Should create a returnTrip for a user', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token1}`)
        .send({
          request_type: 'returnTrip',
          trip_plan: 'singleCity',
          leaving_from: 'dbf285c6-8d7c-4f71-8058-a82e22e27f6b',
          return_date: '09/30/2019',
          travel_date: '09/27/2019',
          destination: '85b4a64e-331b-4051-a32c-6bc20eb0fc81'
        })
        .end((err, res) => {
          expect(res.status).eql(403);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.be.eql('You are not allowed to create a trip request because you don\'t have a manager');
          done();
        });
    });

    it('Should create a oneWayTrip for a user', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({
          request_type: 'oneWayTrip',
          trip_plan: 'singleCity',
          leaving_from: 'dbf285c6-8d7c-4f71-8058-a82e22e27f6b',
          travel_date: '09/27/2019',
          destination: '85b4a64e-331b-4051-a32c-6bc20eb0fc81'
        })
        .end((err, res) => {
          expect(res.status).eql(201);
          expect(res.body.status).to.eql('success');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.all.keys('message', 'trip_request_uuid');
          expect(res.body.data.message).to.be.eql('Your trip request has been created successfully and is waiting approval');
          done();
        });
    });

    it('Should return an error object when all request parameters fields are empty ', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({
          request_type: '',
          trip_plan: '',
          leaving_from: '',
          return_date: '',
          travel_date: '',
          destination: ''
        })
        .end((err, res) => {
          expect(res.status).eql(422);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.be.an('object');
          expect(res.body.error).to.have.all.keys('request_type', 'trip_plan', 'leaving_from', 'return_date', 'travel_date', 'destination');
          done();
        });
    });

    it('Should return an error when the request type is invalid', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({
          request_type: 'noWay',
          trip_plan: 'singleCity',
          leaving_from: 'dbf285c6-8d7c-4f71-8058-a82e22e27f6b',
          return_date: '09/30/2019',
          travel_date: '09/27/2019',
          destination: '85b4a64e-331b-4051-a32c-6bc20eb0fc81'
        })
        .end((err, res) => {
          expect(res.status).eql(422);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.be.an('object');
          expect(res.body.error).to.have.key('request_type');
          expect(res.body.error.request_type).to.eql('request type must be either oneWayTrip or returnTrip');
          done();
        });
    });

    it('Should return an error when the trip plan is invalid', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({
          request_type: 'oneWayTrip',
          trip_plan: 'singleRoom',
          leaving_from: 'dbf285c6-8d7c-4f71-8058-a82e22e27f6b',
          return_date: '09/30/2019',
          travel_date: '09/27/2019',
          destination: '85b4a64e-331b-4051-a32c-6bc20eb0fc81'
        })
        .end((err, res) => {
          expect(res.status).eql(422);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.be.an('object');
          expect(res.body.error).to.have.key('trip_plan');
          expect(res.body.error.trip_plan).to.eql('trip plan must be either singleCity or multiCity');
          done();
        });
    });

    it('Should return an error when the destination/leaving_from is invalid', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({
          request_type: 'oneWayTrip',
          trip_plan: 'singleCity',
          leaving_from: 'dbf285c6-8d7c-4f71-8058-a82e22e27b',
          return_date: '09/30/2019',
          travel_date: '09/27/2019',
          destination: '85b4a64e-331b-4051-a32c-6bc20eb0fc81'
        })
        .end((err, res) => {
          expect(res.status).eql(422);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.be.an('object');
          expect(res.body.error).to.have.key('leaving_from');
          expect(res.body.error.leaving_from).to.eql('Your departure/destination should contain the uuid of the office location');
          done();
        });
    });

    it('Should return an error when the date is an invalid format', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({
          request_type: 'returnTrip',
          trip_plan: 'singleCity',
          leaving_from: 'dbf285c6-8d7c-4f71-8058-a82e22e27f6b',
          return_date: '07-27-2018',
          travel_date: '08/28/2019',
          destination: '85b4a64e-331b-4051-a32c-6bc20eb0fc81'
        })
        .end((err, res) => {
          expect(res.status).eql(422);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.be.an('object');
          expect(res.body.error).to.have.key('return_date');
          expect(res.body.error.return_date).to.eql('date should be of the form MM/DD/YYYY');
          done();
        });
    });

    it('Should return an error when the date is an invalid format', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({
          request_type: 'returnTrip',
          trip_plan: 'singleCity',
          leaving_from: 'dbf285c6-8d7c-4f71-8058-a82e22e27f6b',
          return_date: '09/30/2019',
          travel_date: '07/27/2018',
          destination: '85b4a64e-331b-4051-a32c-6bc20eb0fc81'
        })
        .end((err, res) => {
          expect(res.status).eql(422);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.be.an('object');
          expect(res.body.error).to.have.key('return_date');
          expect(res.body.error.return_date).to.eql('Your travel date must be a future date');
          done();
        });
    });

    it('Should return an error when the date is an invalid format', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({
          request_type: 'returnTrip',
          trip_plan: 'singleCity',
          leaving_from: 'dbf285c6-8d7c-4f71-8058-a82e22e27f6b',
          return_date: '09/21/2019',
          travel_date: '09/27/2019',
          destination: '85b4a64e-331b-4051-a32c-6bc20eb0fc81'
        })
        .end((err, res) => {
          expect(res.status).eql(422);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.be.an('object');
          expect(res.body.error).to.have.key('return_date');
          expect(res.body.error.return_date).to.eql('You cannot enter a return date that is before your travel date');
          done();
        });
    });

    it('Should return an error when the office location/leaving_from do not exist', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({
          request_type: 'oneWayTrip',
          trip_plan: 'singleCity',
          leaving_from: 'dbf285c6-8d7c-4f71-8058-a82e22e27f6a',
          return_date: '09/29/2019',
          travel_date: '09/27/2019',
          destination: '85b4a64e-331b-4051-a32c-6bc20eb0fc81'
        })
        .end((err, res) => {
          expect(res.status).eql(404);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.eql('The office location you are leaving from does not exist');
          done();
        });
    });

    it('Should return an error when the office location/destination do not exist', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({
          request_type: 'oneWayTrip',
          trip_plan: 'singleCity',
          leaving_from: 'dbf285c6-8d7c-4f71-8058-a82e22e27f6b',
          return_date: '09/29/2019',
          travel_date: '09/27/2019',
          destination: '85b4a64e-331b-4051-a32c-6bc20eb0fc82'
        })
        .end((err, res) => {
          expect(res.status).eql(404);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.eql('The office location you are going to does not exist');
          done();
        });
    });

    it('it should call next for server errors', async () => {
      sinon.stub(res, 'send').returnsThis();
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(tripReqRepo, 'getAll').throws();
      const next = sinon.spy();
      expect(await tripController.tripsByUser(req, res, next)).to.throw;
      expect(next.called).to.true;
      sinon.restore();
    });
  });
});
