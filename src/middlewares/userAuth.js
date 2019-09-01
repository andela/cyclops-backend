import {
  validate, inValidName, inValidEmail, inValidPassword, magicTrimmer,
} from '../modules/validator';
import { sendErrorResponse } from '../utils/sendResponse';
import UserRepository from '../repositories/UserRepository';

/**
 * @description userAuth is clas that handles user data validation
 */
export default class userAuth {
  /**
   *
   * @param {req} req object
   *
   * @param {res} res object
   *
   * @param {next} next forwards request to the next middleware function
   *
   * @returns {obj} reurns an response object
   */
  static signup(req, res, next) {
    const userData = magicTrimmer(req.body);
    const {
      name, email, password,
    } = userData;
    const schema = {
      name: inValidName('full name', name),
      email: inValidEmail(email),
      password: inValidPassword(password)
    };

    const error = validate(schema);
    if (error) return sendErrorResponse(res, 422, error);
    return next();
  }

  /**
   *
   * @param {req} req object
   *
   * @param {res} res object
   *
   * @param {next} next forwards request to the next middleware function
   *
   * @returns {obj} reurns an response object
   */
  static signin(req, res, next) {
    const userInfo = magicTrimmer(req.body);
    const { email, password } = userInfo;

    const schema = {
      email: inValidEmail(email),
      password: inValidPassword(password),
    };
    const error = validate(schema);
    if (error) return sendErrorResponse(res, 422, error);
    return next();
  }

  /**
   * Function to check if user exists.
   *
   * @param {Object} req - HTTP request object
   *
   * @param {Object} res - HTTP response object
   *
   * @param {Function} next - Calls next function to execute.
   *
   * @returns {Boolean} reurns - Returns user route permission status('true or false').
   */
  static async userExistCheck(req, res, next) {
    const userData = magicTrimmer(req.body);
    const { email } = userData;
    const result = await UserRepository.findByAttr('email', email);
    if (!result) {
      return next();
    }
    return sendErrorResponse(res, 400, `User ${email} already exists`);
  }
}
