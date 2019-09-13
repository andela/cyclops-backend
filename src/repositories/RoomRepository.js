/**
 * @fileoverview Contains the User Auth Repository class, an interface for querying User table
 *
 * @author TeamCyclops
 *
 * @requires models/Room.js
 */

import Models from '../models';

const { Room } = Models;

/**
 * @description RoomRepository handles our methods to query our accommodation table
 *
 * @class RoomRepostiory
 */
class RoomRepository {
  /**
   * Trip Model constructor
   *
   * @description constructor handles the properties/univsersal data for our requestRepository
   *
   * @constructor
   *
   */
  constructor() {
    this.db = Room;
  }

  /**
 * @description create handles method that query our database
 *
 * @param {object} roomDetails refers to the details of the room
 *
 * @returns {object} the details of the room that was created for a particular accommodation
 */
  async create(roomDetails) {
    try {
      const { dataValues } = await this.db.create(roomDetails);
      return dataValues;
    } catch (err) {
      throw new Error(err);
    }
  }


  /**
   * @description Returns a room details based on the provided parameters
   *
   * @param {Object} condition checks required room parameter
   *
   * @return {Object} returns room details
   */
  async getOne(condition = {}) {
    try {
      return await this.db.findOne({ where: condition });
    } catch (e) {
      throw new Error(e);
    }
  }

}

export default new RoomRepository();
