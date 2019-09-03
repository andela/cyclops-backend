import { verifyToken } from '../modules/tokenProcessor';
import { sendErrorResponse } from '../utils/sendResponse';
import UserRepository from '../repositories/UserRepository';

export default async (req, res, next) => {
  const err = 'Please provide a token';
  try {
    if (!req.headers.authorization) throw err;
    const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
    const { email } = verifyToken(token);
    const user = await UserRepository.getOne({ email });
    if (!user) return sendErrorResponse(res, 401, 'User does not exist');
    req.userData = user;
    next();
  } catch (err) {
    const error = err.message ? 'Authentication Failed' : err;
    sendErrorResponse(res, 401, error);
  }
};
