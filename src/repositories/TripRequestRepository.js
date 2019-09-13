/* eslint-disable camelcase */
/**
 * @fileoverview Contains the User Auth Repository class, an interface for querying User table
 *
 * @author TeamCyclops
 *
 * @requires models/TripRequest.js
 */

import Models from '../models';

const { TripRequest, TripDestination } = Models;

/**
 * @description RequestRepository handles TripRequest model
 *
 * @class TripRequestRepository
 */
class RequestRepository {
  /**
   * Trip Model constructor
   *
   * @description constructor handles the properties/univsersal data for our requestRepository
   *
   * @constructor
   *
   */
  constructor() {
    this.db = TripRequest;
  }


  /**
   * @description Returns user's trip request information based on the provided parameters
   *
   * @param {Object} condition checks trip request required parameter for a user
   *
   * @return {Object} returns trip request details
   */
  async getAll(condition = {}) {
    try {
      return await this.db.findAll({
        where: condition,
        attributes: {
          exclude: ['leaving_from']
        },
        include: [{
          model: TripDestination, as: 'destinations', attributes: ['uuid'], include: ['office']
        }, 'departure', 'comments']
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
 * @description RequestRepository handles method that query our database
 *
 * @param {object} requestDetails refers to the details of the user's request
 *
 * @returns {object} the details of the request that was created
 */
  async create(requestDetails) {
    try {
      const { 
        uuid,
        user_uuid,
        request_type,
        trip_plan,
        leaving_from,
        travel_date,
        travel_reasons,
        status,
        show_profile
      } = requestDetails;
      if (request_type === 'oneWayTrip') {
        const { dataValues } = await this.db.create({ 
          uuid,
          user_uuid,
          request_type,
          trip_plan,
          leaving_from,
          travel_date,
          travel_reasons,
          status,
          show_profile
        });
        return dataValues;
      }
      const { dataValues } = await this.db.create(requestDetails);
      return dataValues;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
 * @description RequestRepository handles method that query our database
 *
 * @param {object} condition refers to the details of your search
 *
 * @returns {object} the details of the request that was created
 */
  async findById(condition) {
    try {
      const tripRequestDetails = await this.db.findOne({ where: condition });
      return tripRequestDetails;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new RequestRepository();
