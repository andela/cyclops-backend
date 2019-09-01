/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import UserRepository from '../repositories/UserRepository';
import { sendSuccessResponse, sendErrorResponse } from '../utils/sendResponse';
import { createToken } from '../modules/tokenProcessor';
import { unhashPassword } from '../utils';

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
   * @return {object} returns new registered user's details
   */
  async signup({ body }, res, next) {
    try {
      const newUser = await UserRepository.create(body);
      return sendSuccessResponse(res, 201, userInfo(newUser));
    } catch (error) {
      next(error);
    }
  }

  /**
   * @description handles login from Google and Facebook
   *
   * @param {object} user accepts user details object
   *
   * @param {res} res object
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
}

export default new AuthController();
