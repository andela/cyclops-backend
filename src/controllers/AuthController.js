/* eslint-disable valid-jsdoc */
import UserRepository from '../repositories/UserRepository';
import { sendSuccessResponse } from '../utils/sendResponse';

/**
 * @description User controller
 */
export default class AuthController {
  /**
   * @param {Object} req - HTTP request object
   *
   * @param {Object} res - HTTP response object
   *
   * @param {Function} next - Function to trigger next middleware
   *
   * @return {Object} Object resoponse with current user created status
   */
  static async signup({ body }, res, next) {
    try {
      const newUser = await UserRepository.create(body);
      sendSuccessResponse(res, 201, newUser);
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
  static async social({ user }, res, next) {
    try {
      const newUser = await UserRepository.social(user);
      sendSuccessResponse(res, 200, newUser);
    } catch (error) {
      next(error);
    }
  }
}
