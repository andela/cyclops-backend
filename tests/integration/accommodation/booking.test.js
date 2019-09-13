import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { createToken } from '../../../src/modules/tokenProcessor';
import app from '../../../src';
import model from '../../../src/models';

const { AccommodationFacility, Room } = model;

chai.use(chaiHttp);

const seededUser = {
  uuid: 'fd847314-71c5-4385-95ee-966c975a3ddd',
  name: 'Suspie Abobo',
  email: 'suspieabobo@yahoo.com',
  role: 'Requester',
};

const token = createToken(seededUser);

describe('Booking API', async () => {
  let room_uuid;

  describe('save accommodation for test', async () => {
    const accommodation = await AccommodationFacility.create({
      user_uuid: 'fd847314-71c5-4385-95ee-966c975a3ddd',
      name: '',
      description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      image_url: ['https://via.placeholder.com/300.png/09f/fff', 'https://via.placeholder.com/300/09f.png/fff', 'https://via.placeholder.com/300/09f/fff.png'],
      services: ['Good food', 'swimming pool'],
      amenities: ['bar', 'exercise'],
      location: 'Lagos',
    });
    const newRoom = await Room.create({
      accommodation_uuid: accommodation.dataValues.uuid,
      name: 'Zion',
      type: 'Deluxe',
      cost: '11.15',
    });
    room_uuid = newRoom.dataValues.uuid;
  });

  it('Should create a booking', (done) => {
    chai.request(app)
      .post('/api/v1/bookings')
      .set('Content-Type', 'Application/json')
      .set('authorization', `Bearer ${token}`)
      .send({
        room_uuid,
        starting_date: '2020-01-01',
        ending_date: '2020-01-03'
      })
      .end((err, res) => {
        expect(res.status).eql(201);
        expect(res.body.status).to.eql('success');
        expect(res.body.data).to.have.property('dates');
        expect(res.body.data).to.have.property('room_uuid');
        done();
      });
  });

  it('Should show bookings for logged in user', (done) => {
    chai.request(app)
      .get('/api/v1/bookings')
      .set('Content-Type', 'Application/json')
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body.data[0].dates).to.be.a('array');
        expect(res.body.data[0]).to.have.property('room');
        done();
      });
  });

  it('Should return error if room is already booked for same all or some of requested dates', (done) => {
    chai.request(app)
      .post('/api/v1/bookings')
      .set('Content-Type', 'Application/json')
      .set('authorization', `Bearer ${token}`)
      .send({
        room_uuid,
        starting_date: '2020-01-01',
        ending_date: '2020-01-03'
      })
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.status).to.eql('error');
        done();
      });
  });
});
