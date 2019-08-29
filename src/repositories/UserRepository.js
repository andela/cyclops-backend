/* eslint-disable require-jsdoc */
/* eslint-disable camelcase */
/**
 * @fileoverview Contains the User Auth Repository class, an interface for querying User table
 *
 * @author TeamCyclops
 *
 * @requires models/User.js
 */

import { hashPassword } from '../utils';
import Model from '../models';
import { createToken } from '../modules/tokenProcessor';
import { sendErrorResponse } from '../utils/sendResponse';

// Returns selected information for logged in user.
const userInfo = (user) => {
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
    this.model = User;
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
    password,
    email,
    name,
    designation
  }) {
    const { dataValues } = await User.create({
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
    social_id,
    name,
    image,
    email,
    provider
  }) {
    const user = provider === 'facebook'
      ? await User.findOne({ where: { facebook_id: social_id } })
      : await User.findOne({ where: { google_id: social_id } });
    if (user) return userInfo(user);

    const { dataValues } = await User.create({
      name,
      email,
      is_verified: true,
      image_url: image,
      facebook_id: (provider === 'facebook' ? social_id : ''),
      google_id: (provider === 'google' ? social_id : ''),
      role: 'employee'
      // eslint-disable-next-line arrow-parens
    });
    return userInfo(dataValues);
  }

  /**
   *@description This is a function that finds a user in the data base
   * @param {string} email this is the response that parameter
   * @param {string}  res This is the email the user provided on sign in
   * @returns {object} returns the user information on the object
   * @returns {object} returns error object if there is any
   */
  // eslint-disable-next-line class-methods-use-this
  async find({ email }, res) {
    try {
      return await User.findOne({ where: { email } });
    } catch (error) {
      return sendErrorResponse(res, 500, 'Internal Server Error');
    }
  }
}

export default new UserRepository();
