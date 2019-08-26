/* eslint-disable camelcase */
import model from '../models';
import { sendSuccessResponse, sendErrorResponse } from '../utils/sendResponse';

const { User } = model;

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
   * @returns {obj} reurns an response object
   */
  static async action(req, res) {
    const {
      social_id, name, image, email, provider
    } = req.user;

    try {
      const user = provider === 'facebook'
        ? await User.findOne({ where: { facebook_id: social_id } })
        : await User.findOne({ where: { google_id: social_id } });
      if (user) return sendSuccessResponse(res, 200, user);

      new User({
        name,
        email,
        image_url: image,
        facebook_id: (provider === 'facebook' ? social_id : ''),
        google_id: (provider === 'google' ? social_id : ''),
        role: 'employee'
      // eslint-disable-next-line arrow-parens
      }).save().then(newUser => sendSuccessResponse(res, 201, newUser));
    } catch (e) {
      return sendErrorResponse(res, 501, e);
    }
  }
}
