import { sendErrorResponse } from '../utils/sendResponse';
import { verifyToken } from '../modules/tokenProcessor';
import { isBlackListed } from '../utils/index';
import UserRepository from '../repositories/UserRepository';


export default async (req, res, next) => {
  const rawToken = req.headers.authorization
    || req.headers['x-access-token']
    || req.body.token
    || req.query.slt;

  const err = 'Please provide a token';

  if (!rawToken) return sendErrorResponse(res, 401, err);

  const isblocked = await isBlackListed(rawToken);
  if (isblocked) {
    return sendErrorResponse(res, 403, 'Unauthorized');
  }
  try {
    const token = rawToken.split(' ')[1];
    const { email } = verifyToken(token);
    const user = await UserRepository.getOne({ email });

    if (!user) return sendErrorResponse(res, 403, 'Unauthorized');
    req.userData = user;
    next();
  } catch (err) {
    const error = err.message ? 'Authentication Failed' : err;
    sendErrorResponse(res, 401, error);
  }
};
