/* eslint-disable class-methods-use-this */
import UserRepository from '../repositories/UserRepository';
import { sendSuccessResponse, sendErrorResponse, successResponse } from '../utils/sendResponse';
import { inValidEmail } from '../modules/validator';

/**
 * @module AdminController
 * @description Controls admin based activities
 */
class AdminController {
  /**
   * @description Assign roles to users
   *
   * @param {*} req - Request Object
   *
   * @param {*} res - Response Object
   *
   * @returns {object} - returns a response object
   *
   * @memberof AdminController
   */
  async assignRole(req, res) {
    const { email, role } = req.body;
    try {
      if (!inValidEmail(email)) {
        const roles = await UserRepository.getRoles();
        if (!roles.includes(role)) return sendErrorResponse(res, 400, `${role} role does not exist`);
        const updatedUser = await UserRepository.setRole(email, role);
        if (!updatedUser) return sendErrorResponse(res, 404, `User with email ${email} not found`);
        return successResponse(res, 200, `New role assigned to ${email}`);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description gets a list of all users
   *
   * @param {object} req - request object
   *
   * @param {object} res - response object
   *
   * @returns {object} returns a response object
   *
   * @memberof AdminController
   */
  async getUsers(req, res) {
    const users = await UserRepository.getAll();
    if (!users) return sendErrorResponse(res, 404, 'No user found');
    const usersInfo = users.map(user => {
      const userInfo = {
        name: user.name,
        email: user.email,
        is_verified: user.is_verified,
        role: user.role
      };
      return userInfo;
    });
    return sendSuccessResponse(res, 200, usersInfo);
  }

  /**
   * @description gets a user by uuid
   *
   * @param {object} req request object
   *
   * @param {object} res response object
   *
   * @returns {object} returns a response containing the user object
   *
   * @memberof AdminController
   */
  async getUser(req, res) {
    const { email } = req.params;
    const user = await UserRepository.getOne({ email });
    if (!user) return sendErrorResponse(res, 404, 'User not found');
    const userInfo = {
      name: user.name,
      email: user.email,
      is_verified: user.is_verified,
      role: user.role
    };
    return sendSuccessResponse(res, 200, userInfo);
  }

  /**
   * @description assigns permissions to role
   *
   * @param {object} req request object
   *
   * @param {object} res response object
   *
   * @returns {object} returns a response containing the user object
   *
   * @memberof AdminController
   */
  async assignPermission(req, res) {
    const { role, permission } = req.body;
    try {
      const roles = await UserRepository.getRoles();
      const permissions = await UserRepository.getPermissions();
      if (!permissions.includes(permission)) return sendErrorResponse(res, 400, `${permission} permission does not exist`);
      if (!roles.includes(role)) return sendErrorResponse(res, 400, `${role} role does not exist`);
      await UserRepository.setPermission(role, permission);
      return successResponse(res, 200, `${permission} permission assigned to ${role} successfully`);
    } catch (error) {
      return sendErrorResponse(res, 500, 'Unable to assign permission');
    }
  }
}

export default new AdminController();
