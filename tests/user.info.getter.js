import { describe, it } from 'mocha';
import { expect } from 'chai';
import userInfo from '../src/utils/getUserInfo';

describe('User Info Getter Test', () => {
  const user = {
    email: 'wokorosamuel@yahoo.com',
    role: 'employee',
    is_verified: true,
    name: 'Woroko Douye Samuel',
    uuid: 1234567890,
  };
  it('it should return token for verified user', () => {
    const userInfos = userInfo(user);
    expect(userInfos).to.have.property('token');
    expect(userInfos.token).to.not.be.null;
  });
  it('it should return empty token for unverified user', () => {
    user.is_verified = false;
    const userInfos = userInfo(user);
    expect(userInfos).to.have.property('token');
    expect(userInfos.token).to.eql('');
  });
});
