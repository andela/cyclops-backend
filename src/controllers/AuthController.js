/* eslint-disable class-methods-use-this */
/* eslint-disable valid-jsdoc */
import UserRepository from '../repositories/UserRepository';
import { createToken } from '../modules/tokenProcessor';
import { sendErrorResponse, successResponse, sendSuccessResponse } from '../utils/sendResponse';
import { inValidEmail, inValidPassword } from '../modules/validator';
import sendEmail from '../services/emails';
import { unhash } from '../utils/hashPassword';

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
   * @param {next} next
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
    const { email } = body;
    const foundUser = await UserRepository.findOne({ email });
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
      const { uuid } = await UserRepository.findOne({ email });
      const token = await createToken({ uuid, email });
      const link = `http://${process.env.APP_URL}/api/v1/auth/resetPassword/${uuid}/${token}`;
      await sendEmail(
        email,
        'Barefoot Nomad Password Reset',
        `Please kindly click the link below to reset your password <br/> ${link}`
      );
      return successResponse(res, 200, 'A password reset link has been sent to your mailbox');
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
        await UserRepository.updatePassword(uuid, password);
        return successResponse(res, 200, 'Password Reset Successfully');
      } catch (error) {
        return sendErrorResponse(res, 500, 'Unable to update password');
      }
    }
    return sendErrorResponse(res, 400, inValidPassword(password));
  }

  /**
   * @description Function to get specific user details
   *
   * @param {Object} req - HTTP request object
   *
   * @param {Object} res - HTTP response object
   *
   * @param {Function} next - Function to trigger next middleware
   *
   * @return {Object} Object resoponse with current user information status
   */
  async show({ body }, res, next) {
    const { token: { email } } = body;
    try {
      const result = await UserRepository.findByAttr('email', email);
      if (result) {
        result.password = undefined;
        return sendSuccessResponse(res, 200, result);
      }
      return sendErrorResponse(res, 400, 'User not found');
    } catch (error) {
      next(error);
    }
  }

  /**
   * @description Function to update user details
   *
   * @param {Object} req - HTTP request object
   *
   * @param {Object} res - HTTP response object
   *
   * @param {Function} next - Function to trigger next middleware
   *
   * @return {Object} Object resoponse with current user created status
   */
  async update({ body }, res, next) {
    try {
      const { token: { email } } = body;
      const result = await UserRepository.update(body, 'email', email);
      if (result) { return sendSuccessResponse(res, 200, result); }
      return sendSuccessResponse(res, 200, 'No edit made');
    } catch (error) {
      next(error);
    }
  }
}


export default new AuthController();
