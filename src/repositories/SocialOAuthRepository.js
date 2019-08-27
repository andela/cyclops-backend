/* eslint-disable camelcase */
/**
 * @fileoverview Contains the Social OAuth Repository class, an interface for querying User table
 *
 * @author Imo-owo Nicholas Nabuk
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
export default class SocialOAuthRepository {
  /**
   *@constructor
   */
  constructor() {
    this.model = User;
  }

  /**
   * @description Returns the newly created user details
   *
   * @param {String} param0 social OAuth details
   *
   * @return {Object} returns new or existing user details
   */
  static async create({
    social_id,
    name,
    image,
    email,
    provider
  }) {
    const user = provider === 'facebook'
      ? await User.findOne({ where: { facebook_id: social_id } })
      : await User.findOne({ where: { google_id: social_id } });
    if (user) return user;

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
    return dataValues;
  }
}
