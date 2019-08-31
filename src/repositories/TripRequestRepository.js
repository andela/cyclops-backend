/* eslint-disable camelcase */
/**
 * @fileoverview Contains the User Auth Repository class, an interface for querying User table
 *
 * @author TeamCyclops
 *
 * @requires models/TripRequest.js
 */

import Model from '../models';

const { TripRequest, TripDestination } = Model;

/**
 * Trip Request repository class
 *
 * @class TripRequestRepository
 */
class TripRequestRepository {
/**
 * Trip Model constructor
 *
 * @constructor
 *
 * @param {Object} model Trip Model constructor
 */
  constructor(model) {
    this.model = model;
  }

  /**
   * @description Returns user's trip request information based on the provided parameters
   *
   * @param {Object} condition checks trip request required parameter for a user
   *
   * @param {Array} added checks trip request required parameter for a user
   *
   * @return {Object} returns trip request details
   */
  async getAll(condition = {}) {
    try {
      return await this.model.findAll({
        where: condition,
        include: [{
          model: TripDestination, as: 'destinations', attributes: ['uuid'], include: ['office']
        }]
      });
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default new TripRequestRepository(TripRequest);
