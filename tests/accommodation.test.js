import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { createToken } from '../src/modules/tokenProcessor';
import app from '../src';

chai.use(chaiHttp);

const supplier = {
  uuid: 'fd847314-71c5-4385-95ee-966c975a3ddd',
  name: 'Suspie Abobo',
  email: 'suspieabobo@yahoo.com',
  role: 'Supplier',
};
const travelAdmin = {
  uuid: '9625221a-0a60-4179-b46e-39220809afd2',
  name: 'Awa Dieudonne',
  email: 'dieudonneawa7@gmail.com',
  role: 'Travel Administrator'
};
let accommodation_uuid;
 
const supplierToken = createToken(supplier);
const travelAdminToken = createToken(travelAdmin);

let accommodationUuid;
const fakeAccommodationUuid = 'fd847314-71c5-4385-95ee-966c975a3ddd';
describe('ACCOMMODATION TESTS', () => {
  it('Should create an accommodation', (done) => {
    chai.request(app)
      .post('/api/v1/accommodation')
      .set('Content-Type', 'Application/json')
      .set('authorization', `Bearer ${supplierToken}`)
      .send({
        name: 'Eko Lodge',
        description: 'We provide you all',
        services: 'laundry, repairs',
        amenities: 'AC, Internet, Electricity',
        image_url: 'http://res.cloudinary.com/blessing.png',
        location: '9, Omoru Street'
      })
      .end((err, res) => {
        accommodation_uuid = res.body.data.uuid;
        expect(res.status).eql(201);
        expect(res.body.status).to.eql('success');
        expect(res.body.data).to.have.all.keys('uuid', 'user_uuid', 'name', 'description', 'location', 'is_approved', 'services', 'amenities', 'image_url', 'createdAt', 'updatedAt');
        done();
      });
  });

  it('Should approve accommodation if user is travel admin', (done) => {
    chai.request(app)
      .put('/api/v1/admin/approve_accommodation')
      .set('Content-Type', 'Application/json')
      .set('authorization', `Bearer ${travelAdminToken}`)
      .send({
        accommodation_uuid
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.eql('success');
        expect(res.body.data).to.have.property('message').eql('Accommodation approved successfully');
        done();
      });
  });

  it('Should fail to approve accommodation if nothing is provided', (done) => {
    chai.request(app)
      .put('/api/v1/admin/approve_accommodation')
      .set('Content-Type', 'Application/json')
      .set('authorization', `Bearer ${travelAdminToken}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.have.property('accommodation_uuid').eql('accommodation_uuid is required');
        done();
      });
  });

  it('Should return all unapproved accommodations', (done) => {
    chai.request(app)
      .get('/api/v1/admin/accommodation')
      .set('Content-Type', 'Application/json')
      .set('authorization', `Bearer ${travelAdminToken}`)
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body.status).to.eql('success');
        expect(res.body.data).to.be.an('array');
        const [accommodationDetails] = res.body.data;
        accommodationUuid = accommodationDetails.uuid;
        done();
      });
  });

  it('Should create an accommodation with a room', (done) => {
    chai.request(app)
      .post('/api/v1/accommodation')
      .set('Content-Type', 'Application/json')
      .set('authorization', `Bearer ${supplierToken}`)
      .send({
        name: 'Eko Lodge',
        description: 'We provide you all',
        services: 'laundry, repairs',
        amenities: 'AC, Internet, Electricity',
        image_url: 'http://res.cloudinary.com/blessing.png',
        location: '9, Omoru Street',
        room_name: 'Eko 1',
        room_type: 'One Bedroom',
        cost: '3000000'
      })
      .end((err, res) => {
        expect(res.status).eql(201);
        expect(res.body.status).to.eql('success');
        expect(res.body.data).to.have.all.keys(
          'uuid', 'user_uuid', 'name', 'description', 
          'location', 'services', 'amenities', 'is_approved', 
          'image_url', 'room', 'createdAt', 'updatedAt'
        );
        done();
      });
  });

  it('Should return an error upon empty inputs', (done) => {
    chai.request(app)
      .post('/api/v1/accommodation')
      .set('Content-Type', 'Application/json')
      .set('authorization', `Bearer ${supplierToken}`)
      .send({
        name: '',
        description: '',
        services: '',
        amenities: '',
        image_url: '',
        location: '',
        room_name: '',
        room_type: '3 Bedroom',
        cost: ''
      })
      .end((err, res) => {
        expect(res.status).eql(422);
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.have.all.keys(
          'name', 'description', 'services', 
          'amenities', 'location', 'image_url', 
          'room_name', 'cost'
        );
        done();
      });
  });

  it('Should return an error upon invalid cost', (done) => {
    chai.request(app)
      .post('/api/v1/accommodation')
      .set('Content-Type', 'Application/json')
      .set('authorization', `Bearer ${supplierToken}`)
      .send({
        name: 'Eko Lodge',
        description: 'We provide you all',
        services: 'laundry, repairs',
        amenities: 'AC, Internet, Electricity',
        image_url: 'http://res.cloudinary.com/blessing.png',
        location: '9, Omoru Street',
        room_name: 'Eko 1',
        room_type: 'One Bedroom',
        cost: '300000.22.33'
      })
      .end((err, res) => {
        expect(res.status).eql(422);
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.have.key({ cost: 'cost should be in the form 565648, 3676372.89,' });
        done();
      });
  });

  it('Should return an error upon invalid image type', (done) => {
    chai.request(app)
      .post('/api/v1/accommodation')
      .set('Content-Type', 'Application/json')
      .set('authorization', `Bearer ${supplierToken}`)
      .send({
        name: 'Eko Lodge',
        description: 'We provide you all',
        services: 'laundry, repairs',
        amenities: 'AC, Internet, Electricity',
        image_url: 'http://res.cloudinary.com/blessing',
        location: '9, Omoru Street',
        room_name: 'Eko 1',
        room_type: 'One Bedroom',
        cost: '300000.22'
      })
      .end((err, res) => {
        expect(res.status).eql(422);
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.have.key({ image_url: 'only jpeg, jpg, and png image formats are accepted,' });
        done();
      });
  });
  
  it('Should return all accommodations', (done) => {
    chai.request(app)
      .get('/api/v1/accommodation')
      .set('Content-Type', 'Application/json')
      .set('authorization', `Bearer ${supplierToken}`)
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body.status).to.eql('success');
        expect(res.body.data).to.be.an('array');
        const [accommodationDetails] = res.body.data;
        accommodationUuid = accommodationDetails.uuid;
        done();
      });
  });

  it('Should return a specific accommodation', (done) => {
    chai.request(app)
      .get(`/api/v1/accommodation/${accommodationUuid}`)
      .set('Content-Type', 'Application/json')
      .set('authorization', `Bearer ${supplierToken}`)
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body.status).to.eql('success');
        expect(res.body.data).to.be.an('object');
        done();
      });
  });

  it('Should return an error if accommodation does not exist', (done) => {
    chai.request(app)
      .get(`/api/v1/accommodation/${fakeAccommodationUuid}`)
      .set('Content-Type', 'Application/json')
      .set('authorization', `Bearer ${supplierToken}`)
      .end((err, res) => {
        expect(res.status).eql(404);
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.be.eql('This accommodation facility does not exist');
        done();
      });
  });

  it('Should create an room for a particular accommodation facility', (done) => {
    chai.request(app)
      .post('/api/v1/room')
      .set('Content-Type', 'Application/json')
      .set('authorization', `Bearer ${supplierToken}`)
      .send({
        accommodation_uuid: accommodationUuid,
        name: '',
        type: 'One Bedroom',
        cost: '300000.22'
      })
      .end((err, res) => {
        expect(res.status).eql(422);
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.be.have.property('name').eql('name is required');
        done();
      });
  });

  it('Should create an room for a particular accommodation facility', (done) => {
    chai.request(app)
      .post('/api/v1/room')
      .set('Content-Type', 'Application/json')
      .set('authorization', `Bearer ${supplierToken}`)
      .send({
        accommodation_uuid: accommodationUuid,
        name: 'Better 3',
        type: '',
        cost: '300000.22'
      })
      .end((err, res) => {
        expect(res.status).eql(422);
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.be.have.property('type').eql('type is required');
        done();
      });
  });

  it('Should create an room for a particular accommodation facility', (done) => {
    chai.request(app)
      .post('/api/v1/room')
      .set('Content-Type', 'Application/json')
      .set('authorization', `Bearer ${supplierToken}`)
      .send({
        accommodation_uuid: accommodationUuid,
        name: 'Better 4',
        type: 'One Bedroom',
        cost: ''
      })
      .end((err, res) => {
        expect(res.status).eql(422);
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.be.have.property('cost').eql('cost is required');
        done();
      });
  });
});
