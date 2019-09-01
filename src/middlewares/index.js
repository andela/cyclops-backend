import { sendErrorResponse } from '../utils/sendResponse';
import { verifyToken } from '../modules/tokenProcessor';

/**
 * @description Fuction to verify token and to pass verified token to the request body.
 *
 * @param {Object} req - HTTP request object
 *
 * @param {Object} res - HTTP response object
 *
 * @param {Object} next - Function to call next middleware.
 *
 * @returns {Void} Returns call next middleware on success, else return error message.
 */
const passToken = async (req, res, next) => {
  const rawToken = req.headers.authorization
    || req.headers['x-access-token']
    || req.body.token;
  const token = rawToken ? rawToken.split(' ')[1] : false;
  if (token) {
    try {
      const issureToken = verifyToken(token);
      if (issureToken) {
        req.body.token = issureToken;
        return next();
      }
    } catch (err) {
      sendErrorResponse(res, 400, 'Invalid token');
    }
  }
  sendErrorResponse(res, 401, 'Authorization Failed');
};

export default passToken;
