import {
  validate, inValidName, inValidEmail, inValidPassword, magicTrimmer,
} from '../modules/validator';
import sendErrorResponse from '../utils/sendResponse';

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
      first_name: firstName, last_name: lastName, email, password,
    } = userData;

    const schema = {
      first_name: inValidName('first name', firstName),
      last_name: inValidName('last name', lastName),
      email: inValidEmail(email),
      password: inValidPassword(password)
    };

    const error = validate(schema);
    if (error) return sendErrorResponse(res, 422, error);
    return next();
  }
}
