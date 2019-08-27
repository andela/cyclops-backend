import SocialOAuthRepository from '../repositories/SocialOAuthRepository';
import { sendSuccessResponse, sendErrorResponse } from '../utils/sendResponse';

/**
 * @description handles passport.js callback for Facebook and Google login.
 */
export default class SocialLoginController {
  /**
   * @description handles login from Google and Facebook
   *
   * @param {req} req object
   *
   * @param {res} res object
   *
   * @returns {obj} returns an response object
   */
  static async action({ user }, res, next) {
    try {
      const newUser = await SocialOAuthRepository.create(user);
      sendSuccessResponse(res, 200, newUser)
    } catch (error) {
      next(error);
    }  
  }
}
