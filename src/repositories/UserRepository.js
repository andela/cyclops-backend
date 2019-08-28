/* eslint-disable camelcase */
/**
 * @fileoverview Contains the User Auth Repository class, an interface for querying User table
 *
 * @author TeamCyclops
 *
 * @requires models/User.js
 */

import Model from '../models';
import { createToken } from '../modules/tokenProcessor';

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
export default class UserRepository {
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
  static async create({
    password,
    email,
    name,
    designation
  }) {
    const { dataValues } = await User.create({
      name,
      email,
      designation,
      password
    });
    return userInfo(dataValues);
  }

  /**
   * @description Returns the newly created user details
   *
   * @param {String} param0 social OAuth details
   *
   * @return {Object} returns new or existing user details
   */
  static async social({
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
}
