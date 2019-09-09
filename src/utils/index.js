// eslint-disable-next-line arrow-parens
import models from '../models';
import UserRepository from '../repositories/UserRepository';

export const getMIlliSeconds = date => (date ? new Date(date).getTime() : new Date().getTime());

export const getDay = (date) => {
  const dateInMillisec = getMIlliSeconds(date);
  return Math.floor(dateInMillisec / 86400000);
};

const { BlackListedToken } = models;

/**
 *
 * @param {string} token it acepts a valid token
 * @returns {boolean} returns true when token is found otherwise false
 */

const isBlackListed = async (token) => {
  const blockedToken = await UserRepository.findToken({ token });
  return !!blockedToken;
};

/**
 * @param {text} token accepts token
 *
 * @returns {string} returns error when it could not create a user
 */
const blackListThisToken = async (token) => {
  await BlackListedToken.create({
    token,
  });
};

export {
  blackListThisToken, isBlackListed
};
