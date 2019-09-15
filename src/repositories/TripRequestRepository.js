/* eslint-disable require-jsdoc */
/* eslint-disable camelcase */
/**
 * @fileoverview Contains the User Auth Repository class, an interface for querying User table
 *
 * @author TeamCyclops
 *
 * @requires models/TripRequest.js
 */

import Models from '../models';

const { TripRequest, TripDestination, Manager } = Models;

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
        }, 'departure']
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
      const { dataValues } = await this.db.create(requestDetails);
      return dataValues;
    } catch (err) {
      throw new Error(err);
    }
  }

  /* @description findOne is a function that search for an office Location
 *
 * @param {object} condition limits the search of the office location
 *
 * @returns {object} the details of the office location that has been searched for
 */
  // eslint-disable-next-line require-jsdoc
  async findById(condition) {
    try {
      const tripRequest = await this.db.findByPk(condition);
      return tripRequest;
    } catch (err) {
      throw new Error(err);
    }
  }

  // eslint-disable-next-line require-jsdoc
  // eslint-disable-next-line class-methods-use-this
  async findManagerById(condition) {
    try {
      const tripRequest = await Manager.findByPk(condition);
      return tripRequest;
    } catch (err) {
      throw new Error(err);
    }
  }

  // eslint-disable-next-line valid-jsdoc
  /**
 * @description RequestRepository handles method that query our database
 *
 * @param {object} changes refers to the details of the user's request
 *
 * @returns {object} the details of the request that was created
 */
  async update(changes, tripUuid) {
    try {
      // eslint-disable-next-line max-len
      const { dataValues } = await this.db.update(changes, { returning: true, where: { uuid: tripUuid } });
      return dataValues;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new RequestRepository();
