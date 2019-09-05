import { createToken } from '../src/modules/tokenProcessor';

export const req = {
  email: 'wokorosamuel@yahoo.com',
  userData: {
    uuid: '12344564344534545',
    dataValues: {
      uuid: '137832957832468945'
    }
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

export const signUpReq = {
  userData: {
    uuid: '12344564344534545',
    dataValues: {
      uuid: '137832957832468945'
    }
  },
  body: {
    email: 'wokorosamuel@yahoo.com'
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
  send: () => {},
  write: () => {},
  writeHead: () => {}
};

export const next = () => {};

export const model = {
  addHook: () => {},
  uuid: '123-343-434-324',
  email: 'wokoro@yahoo.com',
  gender: 'male'
};
