import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

chai.use(chaiHttp);

describe('Successful user signup test POST /api/v1/auth/signup', () => {
  let res = {};
  before(async () => {
    res = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'giftabobo@gmail.com',
        first_name: 'Bles ',
        last_name: 'Abobo',
        password: 'Blessing9',
      });
  });
  it('Should return 200 for succeful signup', () => {
    expect(res.status).eql(200);
  });
  it('Should be an object', () => {
    expect(res.body).to.be.an('object');
  });
  it('Should return success message for signup', () => {
    expect(res.body.status).to.eql('success');
  });
  it('Should return account created message', () => {
    expect(res.body.message).to.eql('Account created successfully');
  });
});
