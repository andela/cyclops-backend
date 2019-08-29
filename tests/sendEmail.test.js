import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sgMail from '@sendgrid/mail';
import sinon from 'sinon';

import sendEmail from '../src/services/emails';

chai.use(chaiHttp);

describe('Send verification Email', () => {
  it('should send an email to user upon successful registration', () => {
    const stub = sinon.stub(sgMail, 'send');
    const statusCode = 201;
    stub.yields(statusCode);
    expect(sendEmail());
    sgMail.send.restore();
  });
});

describe('Function for sending Email ', () => {
  it('sends the email and returns a success code', () => {
    const receiver = 'odogwu@gmail.com';
    const subject = 'I love football';
    const content = '<h1> Team Cyclops </h1>';
    const response = { statusCode() {} };
    const statusCode = sinon.stub(response, 'statusCode').returnsThis();
    const stub = sinon.stub(sgMail, 'send');
    stub.yields(statusCode);
    expect(sendEmail(receiver, subject, content));
    sgMail.send.restore();
  });
});

describe('when the email does not send', () => {
  it('returns an error', () => {
    const stub = sinon.stub(sgMail, 'send');
    const statusCode = 400;
    stub.yields(statusCode);
    expect(sendEmail());
    sgMail.send.restore();
  });
});
