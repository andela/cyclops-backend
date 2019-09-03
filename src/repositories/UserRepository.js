/* eslint-disable camelcase */
/**
 * @fileoverview Contains the User Auth Repository class, an interface for querying User table
 *
 * @author TeamCyclops
 *
 * @requires models/User.js
 */

import Model from '../models';

const { User } = Model;
/**
 * User repository class
 *
 * @class
 */
class UserRepository {
  /**
 * User Model constructor
 *
 * @constructor
 *
 * @param {Object} model User Model constructor
 */
  constructor(model) {
    this.model = model;
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
    const { dataValues } = await this.model.create({
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
  }

  /**
   * @description Returns users details based on the provided parameters
   *
   * @param {Object} condition checks required users parameter
   *
   * @return {Object} returns user details
   */
  async getOne(condition = {}) {
    try {
      return await this.model.findOne({ where: condition });
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
      return await User.update(
        changes,
        { where: { uuid: userId } }
      );
    } catch (e) {
      throw new Error(e);
    }
  }
  // async updatePassword(userId, newPassword) {
  //   try {
  //     const user = await User.findOne({ where: { uuid: userId } });
  //     const updatedUser = await User.update(
  //       { password: newPassword },
  //       { where: { uuid: user.uuid } }
  //     );
  //     return updatedUser;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}

export default new UserRepository(User);
