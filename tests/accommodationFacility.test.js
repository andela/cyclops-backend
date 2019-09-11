import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

chai.use(chaiHttp);

let travelAdminToken, requesterToken, accommodationLocationUuid;
before(done => {
  chai.request(app)
    .post('/api/v1/auth/signin')
    .send({
      email: 'traveladmin@email.com',
      password: '1TravelAdmin'
    })
    .end((err, res) => {
      travelAdminToken = res.body.data.token;
      done();
    });
});
before(done => {
  chai.request(app)
    .post('/api/v1/auth/signin')
    .send({
      email: 'imnotraveladmin@email.com',
      password: '1ImnoTravelAdmin'
    })
    .end((err, res) => {
      requesterToken = res.body.data.token;
      done();
    });
});
describe('Accommodation location tests', () => {
  it('Should create an accommodation location', (done) => {
    chai.request(app)
      .post('/api/v1/accommodation_locations')
      .set('authorization', `Bearer ${travelAdminToken}`)
      .send({
        name: 'Cyclops Estate',
        location: 'Lagos',
        image_url: 'http://images.com/cyclops-image'
      })
      .end((err, res) => {
        accommodationLocationUuid = res.body.data.uuid;
        expect(res).to.have.status(201);
        expect(res.body.status).eql('success');
        expect(res.body.data).to.have.property('name');
        expect(res.body.data).to.have.property('location');
        expect(res.body.data).to.have.property('image_url');
        done();
      });
  });
  it('Should not create an accommodation location if the name is not provided', (done) => {
    chai.request(app)
      .post('/api/v1/accommodation_locations')
      .set('authorization', `Bearer ${travelAdminToken}`)
      .send({
        location: 'Lagos',
        image: 'http://images.com/cyclops-image'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).eql('error');
        expect(res.body).to.have.property('error').eql('Accommodation name is required');
        done();
      });
  });
  it('Should not create an accommodation location if the Location is not provided', (done) => {
    chai.request(app)
      .post('/api/v1/accommodation_locations')
      .set('authorization', `Bearer ${travelAdminToken}`)
      .send({
        name: 'no location',
        image_url: 'http://images.com/cyclops-image'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).eql('error');
        expect(res.body).to.have.property('error').eql('The location of the accommodation is required');
        done();
      });
  });
  it('Should not create an accommodation location if the Location is not provided', (done) => {
    chai.request(app)
      .post('/api/v1/accommodation_locations')
      .set('authorization', `Bearer ${travelAdminToken}`)
      .send({
        name: 'no location',
        location: 'Lagos'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).eql('error');
        expect(res.body).to.have.property('error').eql('An image of the accommodation is required');
        done();
      });
  });
  it('Should not create an accommodation location if it exists already', (done) => {
    chai.request(app)
      .post('/api/v1/accommodation_locations')
      .set('authorization', `Bearer ${travelAdminToken}`)
      .send({
        name: 'Cyclops Estate',
        location: 'Lagos',
        image_url: 'http://images.com/cyclops-image'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).eql('error');
        expect(res.body).to.have.property('error').eql('Accommodation location exists already');
        done();
      });
  });
  it('Should not create an accommodation location if user is not travel administrator', (done) => {
    chai.request(app)
      .post('/api/v1/accommodation_locations')
      .set('authorization', `Bearer ${requesterToken}`)
      .send({
        name: 'Some Estate',
        location: 'Lagos',
        image_url: 'http://images.com/cyclops-image'
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.status).eql('error');
        expect(res.body).to.have.property('error').eql('Unauthorized access');
        done();
      });
  });

  it('Should create room on an accommodation location', (done) => {
    chai.request(app)
      .post(`/api/v1/accommodation_locations/${accommodationLocationUuid}/rooms`)
      .set('authorization', `Bearer ${travelAdminToken}`)
      .send({
        room_name: 'Cyclops room',
        room_type: 'Family'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).have.property('status').eql('success');
        expect(res.body).have.property('data').to.be.an('object');
        done();
      });
  });
  it('Should not create room on an accommodation location if the room name is not provided', (done) => {
    chai.request(app)
      .post(`/api/v1/accommodation_locations/${accommodationLocationUuid}/rooms`)
      .set('authorization', `Bearer ${travelAdminToken}`)
      .send({
        room_type: 'Family'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).have.property('status').eql('error');
        expect(res.body).have.property('error').eql('Room name is required');
        done();
      });
  });
  it('Should not create room on an accommodation location if the room type is not provided', (done) => {
    chai.request(app)
      .post(`/api/v1/accommodation_locations/${accommodationLocationUuid}/rooms`)
      .set('authorization', `Bearer ${travelAdminToken}`)
      .send({
        room_name: 'No type'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).have.property('status').eql('error');
        expect(res.body).have.property('error').eql('Room type is required');
        done();
      });
  });
  it('Should not create room on an accommodation location if user is not travel administrator', (done) => {
    chai.request(app)
      .post(`/api/v1/accommodation_locations/${accommodationLocationUuid}/rooms`)
      .set('authorization', `Bearer ${requesterToken}`)
      .send({
        room_name: 'mami room',
        room_type: 'Family'
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).have.property('status').eql('error');
        expect(res.body).have.property('error').eql('Unauthorized access');
        done();
      });
  });
});
