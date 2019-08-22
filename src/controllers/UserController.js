/**
 * @fileoverview Contains the User controller class
 *
 * @author Wokoro Douye Samuel
 *
 * @requires repositories/userRepository.js
 */

import UserRepostitory from '../repositories/userRepository';

/**
 * The User controller class
 * @class
 */
export default class UserController {
  /**
   * Function to create user
   * @param {Object} req - HTTP request object
   * @param {Object} res - HTTP response object
   * @param {Function} next - Function to trigger next middleware
   * @return {Object} Object resoponse with current user created status
   */
  static async signup({ body }, res, next) {
    try {
      await UserRepostitory.create(body);
      res
        .status(200)
        .send({
          status: 'success',
          message: 'Account successfully created'
        });
    } catch (error) {
      next(error);
    }
  }
}
