/* eslint-disable class-methods-use-this */
/* eslint-disable linebreak-style */
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import '@babel/polyfill';

config();
/**
 *
 * ProcessToken
 */
export default class ProcessToken {
  /**
   *
   * @param {object} payload
   * @returns {string} token
   */
  static createToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });
    return token;
  }

  /**
   *
   * @param {string} token
   * @returns {object} verifiedToken
   */
  static verifyToken(token) {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });
    return verifiedToken;
  }
}
