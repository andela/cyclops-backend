/* eslint-disable no-useless-catch */
/* eslint-disable class-methods-use-this */
/* eslint-disable require-jsdoc */
/* eslint-disable camelcase */
/**
 * @fileoverview Contains the User Auth Repository class, an interface for querying User table
 *
 * @author TeamCyclops
 *
 * @requires models/User.js
 */

import { hashPassword } from '../utils/hashPassword';
import Model from '../models';
import { createToken } from '../modules/tokenProcessor';

// Returns selected information for logged in user.
const userInfo = user => {
  const {
    email, name, role, uuid, image_url, is_verified
  } = user;
  return {
    uuid,
    name,
    image_url,
    email,
    role,
    token: is_verified ? createToken({ uuid, role, email }) : ''
  };
};

const { User } = Model;
/**
 * User repository class
 *
 * @class
 */
class UserRepository {
  /**
   *@constructor
   */
  constructor() {
    this.db = User;
  }

  /**
   * @description Returns the newly created user details
   *
   * @param {String} param0 user password
   *
   * @param {Object} param1 other user detials
   *
   * @return {Object} returns user details
   */
  // eslint-disable-next-line class-methods-use-this
  async create({
    password, email, name, designation
  }) {
    const { dataValues } = await this.db.create({
      name,
      email,
      designation,
      password: hashPassword(password)
    });
    return dataValues;
  }

  /**
   * @description Returns the newly created user details
   *
   * @param {String} param0 social OAuth details
   *
   * @return {Object} returns new or existing user details
   */
  // eslint-disable-next-line class-methods-use-this
  async social({
    social_id, name, image, email, provider
  }) {
    const user = provider === 'facebook'
      ? await this.db.findOne({ where: { facebook_id: social_id } })
      : await this.db.findOne({ where: { google_id: social_id } });
    if (user) return userInfo(user);

    const { dataValues } = await this.db.create({
      name,
      email,
      is_verified: true,
      image_url: image,
      facebook_id: provider === 'facebook' ? social_id : '',
      google_id: provider === 'google' ? social_id : '',
      role: 'employee'
      // eslint-disable-next-line arrow-parens
    });
    return userInfo(dataValues);
  }

  /**
   * 
   * @param {string} userId 
   * 
   * @param {string} newPassword
   * 
   * @returns {object} updated user
   */
  async updatePassword(userId, newPassword) {
    try {
      const user = await User.findOne({ where: { uuid: userId } });
      const updatedUser = await User.update(
        { password: newPassword },
        { where: { uuid: user.uuid } }
      );
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Returns the newly created user details
   *
   * @param {String} condition handles the limit of your search
   *
   * @param {String} include is a variable that handles table relationship
   *
   * @return {Object} returns new or existing user details
   */
  async findOne(condition, include = '') {
    try {
      const user = await this.db.findOne({ where: condition, include });
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new UserRepository();
