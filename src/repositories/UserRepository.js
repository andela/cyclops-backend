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

const { User, BlackListedToken } = Model;
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
      return await User.update(changes, { where: { uuid: userId } });
    } catch (e) {
      throw new Error(e);
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
}
export default new UserRepository();
