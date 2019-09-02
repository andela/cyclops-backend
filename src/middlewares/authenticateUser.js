import { verifyToken } from '../modules/tokenProcessor';
import { sendErrorResponse } from '../utils/sendResponse';

const authenticateUser = (req, res, next) => {
  const err = 'Please provide a token';
  try {
    if (!req.headers.authorization) throw err;
    const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
    const userDetail = verifyToken(token);
    req.userData = userDetail;
    next();
  } catch (err) {
    const error = err.message ? 'Authentication Failed' : err;
    sendErrorResponse(res, 401, error);
  }
};

export default authenticateUser;
