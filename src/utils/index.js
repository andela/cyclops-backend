// eslint-disable-next-line arrow-parens
import bcrypt from 'bcrypt';
import uuid from 'uuid';
import models from '../models';
import UserRepository from '../repositories/UserRepository';
import sendErrorResponse from './sendResponse';

export const getMIlliSeconds = date => (date ? new Date(date).getTime() : new Date().getTime());

export const getDay = (date) => {
  const dateInMillisec = getMIlliSeconds(date);
  return Math.floor(dateInMillisec / 86400000);
};

const { BlackListedToken } = models;

/**
 * Function to hash user password
 * @param {string} password
 * @returns {string} returns encryted password
 */

const hashPassword = password => bcrypt.hashSync(password, 10);
/**
 * Function to decrypt a hash password compares it
 * @param {string} password it accepts password
 * @param {string} hashpassword it accepts user's hashed password
 * @returns {boolean} unhash returns true if comparism is matched
 */
const unhash = (password, hashpassword) => bcrypt.compareSync(password, hashpassword);

/**
 *
 * @param {string} token it acepts a valid token
 * @returns {boolean} returns true when token is found otherwise false
 */

const isBlackListed = async (token) => {
  const blockedToken = await UserRepository.findToken(token);
  return !!blockedToken;
};

/**
 * @param {string} token accepts token
 * @param {string} res sends response body
 * @returns {string} returns error when it could not create a user
 */
const blackListThisToken = async (token, res) => {
  try {
    await BlackListedToken.create({
      uuid: uuid(),
      token,
    });
  } catch (error) {
    return sendErrorResponse(res, 500, 'Internal Server Error');
  }
};

export {
  hashPassword, unhash, blackListThisToken, isBlackListed
};
