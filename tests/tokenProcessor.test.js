/* eslint-disable linebreak-style */
import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import { createToken, verifyToken } from '../src/modules/tokenProcessor';

chai.use(chaiHttp);

describe('Verify Token Test', () => {
  const email = 'somemail@mail.com';
  const token = createToken({ email });
  const verifiedToken = verifyToken(token);
  describe('Create Token Test', () => {
    it('Should return a token string', (done) => {
      expect(token).to.be.a('string');
      done();
    });
  });

  describe('Test Verify Token', () => {
    it('Should return an object', (done) => {
      expect(verifiedToken).to.be.an('object');
      expect(verifiedToken).to.have.property('email').eql('somemail@mail.com');
      done();
    });
  });
});
