/**
 * @fileoverview Contains the User Auth Repository class, an interface for querying User table
 *
 * @author TeamCyclops
 *
 * @requires models/Manager.js
 */

import Model from '../models';


// Returns selected information for logged in user.

const { Manager } = Model;
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
    this.db = Manager;
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
      const manager = await this.db.findOne({ where: condition, include });
      return manager;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new UserRepository();
