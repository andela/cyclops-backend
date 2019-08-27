/* eslint-disable camelcase */
import model from '../models';
import { sendSuccessResponse, sendErrorResponse } from '../utils/sendResponse';

const { User } = model;

/**
 * UserController.
 */
class UserController {
  /**
   * @description registers a new user
   *
   * @param {req} req object
   *
   * @param {res} res object
   *
   * @returns {obj} reurns an response object
   */
  static async signup(req, res) {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (user) {
        return sendErrorResponse(res, 409, 'User with that email already exist');
      }

      const {
        name,
        email,
        password,
      } = req.body;

      new User({
        name,
        email,
        password,
      // eslint-disable-next-line arrow-parens
      }).save().then(newUser => sendSuccessResponse(res, 201, newUser));
    } catch (e) {
      return sendErrorResponse(res, 501, e);
    }
  }
}

export default UserController;
