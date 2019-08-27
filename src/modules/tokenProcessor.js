/* eslint-disable linebreak-style */
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config();

/**
 *
 * @param {object} payload
 * @returns {string} token
 */
export const createToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });
  return token;
};

/**
 *
 * @param {string} token
 * @returns {object} verifiedToken
 */
export const verifyToken = (token) => {
  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });
  return verifiedToken;
};
