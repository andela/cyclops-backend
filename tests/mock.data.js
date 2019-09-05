import { createToken } from '../src/modules/tokenProcessor';

export const req = {
  email: 'wokorosamuel@yahoo.com',
  userData: {
    uuid: '12344564344534545'
  },
  headers: {
    authorization: `Bearer ${createToken({ email: 'wokorosamuel@yahoo.com' })}`
  },
  body: {
    token: {
      email: 'wokorosamuel@yahoo.com'
    }
  }
};

export const emptyTokenReq = {
  headers: {
    authorization: ''
  },
  body: {}
};

export const invalidTokenReq = {
  headers: {
    authorization: 'Bearer invalidtoken'
  },
  body: {}
};

export const res = {
  status: () => {},
  send: () => {}
};


export const next = () => {};
