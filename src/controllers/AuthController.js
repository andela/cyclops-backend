/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import UserRepository from '../repositories/UserRepository';
import { createToken } from '../modules/tokenProcessor';
import { sendErrorResponse, successResponse, sendSuccessResponse } from '../utils/sendResponse';
import { inValidEmail, inValidPassword } from '../modules/validator';
import sendEmail from '../services/emails';
import { hashPassword, unhashPassword } from '../utils';

// Returns selected information for logged in user.
const userInfo = (user) => {
  const {
    email, name, role, uuid, is_verified
  } = user;
  return {
    token: is_verified ? createToken({
      name,
      uuid,
      email,
      role
    }) : ''
  };
};

/**
 * @description User controller
 */
class AuthController {
  /**
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP response object
   *
   * @param {function} next - Function to trigger next middleware
   *
   * @return {Object} Return sucess message and account creation status
   */
  async signup({ body }, res, next) {
    try {
      body.password = hashPassword(body.password);
      await UserRepository.create(body);
      return sendSuccessResponse(res, 201, 'User account created successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * @description handles login from Google and Facebook
   *
   * @param {object} user accepts user details object
   *
   * @param {res} res object*
   *
   * @param {function} next returns error if process fails
   *
   * @returns {object} returns a new or existing user's details
   */
  async social({ user }, res, next) {
    try {
      const {
        social_id,
        name,
        image,
        email,
        provider
      } = user;

      const checkUser = provider === 'facebook'
        ? await UserRepository.getOne({ facebook_id: social_id })
        : await UserRepository.getOne({ google_id: social_id });
      if (checkUser) return sendSuccessResponse(res, 201, userInfo(checkUser));

      const newUser = await UserRepository.create({
        name,
        email,
        is_verified: true,
        image_url: image,
        facebook_id: (provider === 'facebook' ? social_id : ''),
        google_id: (provider === 'google' ? social_id : ''),
        role: 'employee'
      });
      return sendSuccessResponse(res, 201, userInfo(newUser));
    } catch (error) {
      next(error);
    }
  }

  /**
   * @description Uses login with email and password
   *
   * @param {object} body the request object
   *
   * @param {res} res the response object
   *
   * @param {function} next this is the body of the request
   *
   * @returns {res} returns an response object
   */
  async signin({ body }, res, next) {
    try {
      const { email, password } = body;
      const foundUser = await UserRepository.getOne({ email });
      if (!foundUser) return sendErrorResponse(res, 404, 'User not found');
      const confirmPassword = unhashPassword(password, foundUser.dataValues.password);
      if (!confirmPassword) return sendErrorResponse(res, 400, 'Incorrect Password');
      if (!foundUser.dataValues.is_verified) return sendErrorResponse(res, 401, 'Verify Your Account');
      return sendSuccessResponse(res, 200, userInfo(foundUser));
    } catch (error) {
      next(error);
    }
  }

  /**
  * @description Sends reset link to user Email
  *
  * @param {Object} req - Request object
  *
  * @param {Object} res - Response object
  *
  * @returns {Object} object containing user data which will be embedded in link sent to user
  *
  * @memberof UserController
  */
  async sendResetLink(req, res) {
    const { email } = req.body;
    if (!inValidEmail(email)) {
      const { uuid } = await UserRepository.getOne({ email });
      const token = await createToken({ uuid, email });
      const link = `http://${process.env.APP_URL}/api/v1/auth/resetPassword/${uuid}/${token}`;
      try {
        await sendEmail(
          email,
          'Barefoot Nomad Password Reset',
          `Please kindly click the link below to reset your password <br/> ${link}`
        );
        return successResponse(res, 200, 'A password reset link has been sent to your mailbox');
      } catch (error) {
        return sendErrorResponse(res, 500, 'Unable to perform the operation at the moment');
      }
    }
    return sendErrorResponse(res, 400, inValidEmail(email));
  }

  /**
   * @description Updates the user's password
   *
   * @param {object} req - request object
   *
   * @param {object} res - response object
   *
   * @returns {object} either error or success
   */
  async resetPassword(req, res) {
    const { password } = req.body;
    const { uuid } = req.params;
    if (!inValidPassword(password)) {
      try {
        await UserRepository.update(uuid, { password });
        return successResponse(res, 200, 'Password Reset Successfully');
      } catch (error) {
        return sendErrorResponse(res, 500, 'Unable to update password');
      }
    }
    return sendErrorResponse(res, 400, inValidPassword(password));
  }
}

export default new AuthController();
