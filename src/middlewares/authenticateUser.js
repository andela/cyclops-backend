/* eslint-disable require-jsdoc */
import { verifyToken } from '../modules/tokenProcessor';
import { isBlackListed } from '../utils/index';
import { sendErrorResponse } from '../utils/sendResponse';
import UserRepository from '../repositories/UserRepository';
/**
 * @description authentication controller class
 */
class authenticate {
  /**
   * checks blacked listed tokens.
   * @param {request} req .
   * @param {response} res The second number.
   * @param {next} next The second number.
   * @returns {void} calls next on success.
   * @returns {errror} return error on failure to validate.
   */
  // eslint-disable-next-line class-methods-use-this
  async authenticateUser(req, res, next) {
    const err = 'Please provide a token';
    try {
      if (!req.headers.authorization) throw err;
      const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
      const userDetail = verifyToken(token);
      const { email } = userDetail;
      req.userData = userDetail;
      const user = await UserRepository.find(email);
      if (!user) return sendErrorResponse(res, 403, 'Unauthorized');
      next();
    } catch (err) {
      const error = err.message ? 'Authentication Failed' : err;
      sendErrorResponse(res, 401, error);
    }
  }

  /**
   * checks blacked listed tokens.
   * @param {request} req .
   * @param {response} res The second number.
   * @param {next} next The second number.
   * @returns {void} calls next on success.
   * @returns {errror} return error on failure to validate.
   */

  // eslint-disable-next-line class-methods-use-this
  async isblackListedToken(req, res, next) {
    try {
      const token = req.headers.authorization;
      const isblocked = await isBlackListed(token);
      if (isblocked) {
        return sendErrorResponse(res, 403, 'Unauthorized');
      }
      next();
    } catch (e) {
      return sendErrorResponse(res, 500, 'Internal Server Error');
    }
  }
}

export default new authenticate();
