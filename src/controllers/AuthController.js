/* eslint-disable class-methods-use-this */
/* eslint-disable valid-jsdoc */
import UserRepository from '../repositories/UserRepository';
import { sendSuccessResponse, sendErrorResponse } from '../utils/sendResponse';
import { createToken } from '../modules/tokenProcessor';
import { unhash } from '../utils/index';

const unhashPassword = unhash;

/**
 * @description User controller
 */
class AuthController {
  /**
   * @param {Object} req - HTTP request object
   *
   * @param {Object} res - HTTP response object
   *
   * @param {Function} next - Function to trigger next middleware
   *
   * @return {Object} Return sucess message and account creation status
   */
  async signup({ body }, res, next) {
    try {
      await UserRepository.create(body);
      const message = 'User account created successfully';
      sendSuccessResponse(res, 201, message);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @description handles login from Google and Facebook
   *
   * @param {req} req object
   *
   * @param {res} res object
   *
   * @returns {obj} returns an response object
   */
  async social({ user }, res, next) {
    try {
      const newUser = await UserRepository.social(user);
      sendSuccessResponse(res, 200, newUser);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @description Uses login with email and password
   * @param {req} req the request object
   * @param {res} res the response object
   * @param {object} body this is the body of the request
   * @returns {obj} returns an response object
   */
  async signin({ body }, res) {
    const foundUser = await UserRepository.find(body);
    const { password } = body;
    if (!foundUser) return sendErrorResponse(res, 404, 'User not found');
    const confirmPassword = unhashPassword(password, foundUser.dataValues.password);
    if (!confirmPassword) return sendErrorResponse(res, 400, 'Incorrect Password');
    if (!foundUser.dataValues.is_verified) return sendErrorResponse(res, 401, 'Verify Your Account');
    const userInformation = {
      token: createToken({ uuid: foundUser.uuid, role: foundUser.role, email: foundUser.email }),
      uuid: foundUser.uuid,
      email: foundUser.email,
      name: foundUser.name
    };
    return sendSuccessResponse(res, 200, userInformation);
  }
}

export default new AuthController();
