/* eslint-disable camelcase */
// Returns selected information for logged in user.
import { createToken } from '../modules/tokenProcessor';

export default (user) => {
  const {
    email, name, role, uuid, is_verified
  } = user;
  return {
    token: is_verified ? createToken({
      name,
      uuid,
      email,
      role
    }) : ''
  };
};
