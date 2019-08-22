/**
 * @fileoverview Contains the User Repository class, an interface for querying User table
 *
 * @author Wokoro Douye Samuel
 *
 * @requires models/User.js
 * @requires utils/index.js
 */

import Model from '../models';
import hashPassword from '../utils';

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
   * @param {String} param0 user password
   * @param {Object} param1 other user detials
   * @return {Object} returns user details
   */
  static async create({
    password,
    email,
    name,
    designation
  }) {
    const encryptedPassword = hashPassword(password);
    const { dataValues } = await User.create({
      name,
      email,
      designation,
      password: encryptedPassword
    });
    return dataValues;
  }
}
