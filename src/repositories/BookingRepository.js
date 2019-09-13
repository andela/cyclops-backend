/**
 * @fileoverview Contains the Booking repository for querying the db
 *
 * @author TeamCyclops
 *
 * @requires models/Booking.js
 */

import Model from '../models';

const { Booking } = Model;

/**
 * User repository class
 *
 * @class
 */
class BookingRepository {
  /**
   * @description constructor handles the booking model
   *
   * Booking Model constructor
   *
   * @constructor
   *
   */
  constructor() {
    this.db = Booking;
  }

  /**
   * @description Creates a new booking with provided details
   *
   * @param {Object} param booking details
   *
   * @return {Object} returns new booking details
   */
  async create({
    user_uuid,
    room_uuid,
    dates,
    status
  }) {
    try {
      const { dataValues } = await this.db.create({
        user_uuid,
        room_uuid,
        dates,
        status,
      });
      return dataValues;
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * @description this is a method that gets all bookings in the database
   *
   * @param {Object} condition values of the bookings searched for
   *
   * @returns {array} returns an array of bookings object
   */
  async getAll(condition = {}) {
    try {
      return await this.db.findAll({
        where: condition,
        attributes: {
          exclude: ['updatedAt']
        },
        include: ['room']
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new BookingRepository();
