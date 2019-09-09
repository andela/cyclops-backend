/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import UserRepository from '../repositories/UserRepository';
import { blackListThisToken } from '../utils';
import { createToken, verifyToken } from '../modules/tokenProcessor';
import { sendErrorResponse, successResponse, sendSuccessResponse } from '../utils/sendResponse';
import { inValidEmail, inValidPassword } from '../modules/validator';
import sendEmail from '../services/emails';
import { unhashPassword } from '../utils/hashPassword';

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
   * @param {Object} req - HTTP request object
   *
   * @param {Object} res - HTTP response object
   *
   * @param {Function} next - Function to trigger next middleware
   *
   * @return {Object} Return success message and account creation status
   */
  async signup({ protocol, headers, body }, res, next) {
    try {
      const { email, name } = body;
      const newUser = await UserRepository.create(body);
      const message = 'User account created successfully';
      const token = createToken(
        {
          uuid: newUser.uuid,
          name,
          email,
          role: newUser.role
        }
      );
      newUser.token = token;
      const link = `${protocol}//${headers.host}/api/v1/auth/confirm_email?token=${token}&id=${newUser.uuid}`;
      await sendEmail(
        email,
        'Barefoot Nomad Account Verification',
        `Please kindly click on the link below to verify your account <br/> ${link}`
      );
      return sendSuccessResponse(res, 201, message);
    } catch (error) {
      next(error);
    }
  }

  /**
   * 
   * @param {object} req
   * 
   * @param {object} res
   * 
   * @returns {object} returns a response object
   */
  async confirmEmail(req, res) {
    const { token } = req.query;
    try {
      const verify = await verifyToken(token);
      const user = await UserRepository.getOne({ uuid: verify.uuid });
      if (user.dataValues.is_verified === true) return sendErrorResponse(res, 400, 'Account verified already');
      await UserRepository.verifyUser(verify.uuid);
      return successResponse(res, 200, 'Email verified successfully');
    } catch (err) {
      return sendErrorResponse(res, 400, 'Unable to verifiy email');
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
    } catch (err) {
      return next(err);
    }
  }

  /**
   * @description Uses login with email and password
   * 
   * @param {req} req the request object
   * 
   * @param {res} res the response object
   * 
   * @param {object} body this is the body of the request
   * 
   * @returns {obj} returns an response object
   */
  async signin({ body }, res) {
    const { email } = body;
    const foundUser = await UserRepository.getOne({ email });
    const { password } = body;
    if (!foundUser) return sendErrorResponse(res, 404, 'User not found');
    const confirmPassword = unhashPassword(password, foundUser.dataValues.password);
    if (!confirmPassword) return sendErrorResponse(res, 400, 'Incorrect Password');
    if (!foundUser.dataValues.is_verified) return sendErrorResponse(res, 401, 'Verify Your Account');
    const token = await createToken(
      {
        uuid: foundUser.uuid,
        role: foundUser.role,
        email: foundUser.email,
        role_uuid: foundUser.role_uuid
      }
    );
    const userInformation = {
      token,
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
      const { uuid } = await UserRepository.getOne({ email });
      const token = await createToken({ uuid, email });
      const link = `${req.protocol}//${req.headers.host}/api/v1/auth/reset_password/${uuid}/${token}`;
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
   * @param {object} next - response object
   *
   * @returns {object} either error or success
   */
  async resetPassword(req, res, next) {
    const { password } = req.body;
    const { uuid } = req.params;
    if (!inValidPassword(password)) {
      try {
        await UserRepository.update(uuid, { password });
        return successResponse(res, 200, 'Password Reset Successfully');
      } catch (error) {
        return next(error);
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
  async show({ userData }, res, next) {
    const { email } = userData;
    try {
      const { dataValues: user } = await UserRepository.getOne({ email });
      if (user) {
        user.password = undefined;
        return sendSuccessResponse(res, 200, user);
      }
      return sendErrorResponse(res, 400, 'User not found');
    } catch (error) {
      next(error);
    }
  }

  /**
   * @description logs out a user
   *
   * @param {object} req request from body to log out
   *
   * @param {object} res response to the body
   *
   * @returns {object} success
   */
  async signout(req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
      await blackListThisToken(token);
      return sendSuccessResponse(res, 200, 'You have succesfully signout');
    } catch (error) {
      return sendErrorResponse(res, 400, error);
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
  async update(req, res, next) {
    try {
      const { body, userData: { uuid: userId } } = req;
      const [numberOfEdits, [{ dataValues }]] = await UserRepository.update(userId, body);
      numberOfEdits > 0
        ? sendSuccessResponse(res, 200, dataValues)
        : sendSuccessResponse(res, 200, 'No edit made');
    } catch (error) {
      next(error);
    }
  }
}


export default new AuthController();
