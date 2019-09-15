/* eslint-disable no-plusplus */
/* eslint-disable linebreak-style */
/* eslint-disable no-useless-catch */
/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
/**
 * @fileoverview Contains the User Auth Repository class, an interface for querying User table
 *
 * @author TeamCyclops
 *
 * @requires models/User.js
 */

import Model from '../models';

const {
  User,
  BlackListedToken,
  Role,
  Permission,
  RolePermission,
  Manager
} = Model;

/**
 * User repository class
 *
 * @class
 */
class UserRepository {
  /**
   * @description constructor handles the user model
   *
   * User Model constructor
   *
   * @constructor
   *
   */
  constructor() {
    this.db = User;
  }

  /**
   * @description Creates a new user account with provided details
   *
   * @param {Object} param users details
   *
   * @return {Object} returns new user details
   */
  async create({
    password,
    email,
    name,
    designation,
    is_verified,
    image_url = '',
    facebook_id = '',
    google_id = ''
  }) {
    try {
      const { dataValues } = await this.db.create({
        name,
        email,
        designation,
        password,
        is_verified,
        image_url,
        facebook_id,
        google_id
      });
      return dataValues;
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * @description Returns users details based on the provided parameters
   *
   * @param {Object} condition checks required users parameter
   *
   * @param {Object} include adds users managers
   *
   * @return {Object} returns user details with managers uuid
   */
  async getOne(condition = {}, include = '') {
    try {
      return await this.db.findOne({ where: condition, include });
    } catch (e) {
      throw new Error(e);
    }
  }
  
  /**
   * @description this is a method that gets all users in the database
   * 
   * @returns {array} returns an array of user objects
   */
  async getAll() {
    try {
      return await User.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }


  /**
   * @description This is a function that finds a user token in the data base
   *
   * @param {Object} condition checks token in db
   *
   * @return {Object} returns token
   */
  async findToken(condition = {}) {
    try {
      return await BlackListedToken.findOne({ where: condition });
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   * @param {string} userId
   *
   * @param {object} changes to update for user
   *
   * @returns {object} updated user
   */
  async update(userId, changes) {
    try {
      await this.getOne({ uuid: userId });
      return await User.update(changes, { returning: true, where: { uuid: userId } });
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * @description gets a list of roles from the database
   * 
   * @returns {*} an array of role names
   */
  async getRoles() {
    try {
      const roles = await Role.findAll();
      if (!roles) return;
      const roleNames = roles.map(role => role.dataValues.name);
      return roleNames;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description gets a list of permissions from the database
   * 
   * @param {*} roleId
   * 
   * @returns {array} an array of permission names
   */
  async getRolePermissions(roleId) {
    try {
      const [roles] = await Role.findAll(
        {
          where: { uuid: roleId }, 
          include: [
            {
              model: Permission,
              as: 'permissions',
              required: true,
              attributes: ['uuid', 'name'],
              through: { attributes: [] }
            }
          ],
        }
      );
      return roles.dataValues.permissions;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * @description gets a list of permissions from the database
   * 
   * @returns {array} an array of permission names
   */
  async getPermissions() {
    try {
      const permissions = await Permission.findAll();
      if (!permissions) return;
      const permissionNames = permissions.map(permission => permission.dataValues.name);
      return permissionNames;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * 
   * @param {string} email 
   * 
   * @param {string} newRole
   * 
   * @returns {object} updated user
   */
  async setRole(email, newRole) {
    try {
      const { uuid } = await Role.findOne({ where: { name: newRole } });
      const data = await User.update(
        { role_uuid: uuid, role: newRole },
        { where: { email }, returning: true, plain: true }
      );
      if (newRole === 'Manager') {
        await Manager.create(
          { uuid: data.uuid }
        );
      }
      
      return data;
    } catch (error) {
      throw Error(error);
    }
  }

  /**
   * 
   * @param {string} role
   * 
   * @param {string} permission
   * 
   * @returns {object} updated user
   */
  async setPermission(role, permission) {
    try {
      const userRole = await Role.findOne({ where: { name: role } });
      const userPermission = await Permission.findOne({ where: { name: permission } });
      const newRolePermission = await RolePermission.create(
        { role_uuid: userRole.uuid, permission_id: userPermission.uuid }
      );
      return newRolePermission;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * @param {*} userId
   * 
   * @returns {*} returns a verified user object
   */
  async verifyUser(userId) {
    try {
      const user = await User.update(
        { is_verified: true },
        { where: { uuid: userId }, returning: true }
      );
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  /* @description findOne is a function that search for an office Location
 *
 * @param {object} condition limits the search of the office location
 *
 * @returns {object} the details of the office location that has been searched for
 */
  // eslint-disable-next-line require-jsdoc
  async findById(condition) {
    try {
      const tripRequest = await this.db.findByPk(condition);
      return tripRequest;
    } catch (err) {
      throw new Error(err);
    }
  }
}
export default new UserRepository();
