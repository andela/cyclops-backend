/* eslint-disable camelcase */
/**
 * @fileoverview Contains the AccommodationRepository class, an interface for querying User table
 *
 * @author TeamCyclops
 *
 * @requires models/Accommodation.js
 */

import Models from '../models';

const { AccommodationFacility } = Models;

/**
 * @description AccommodationFacilityRepository handles our methods to query our accommodation table
 *
 * @class AccommodationFacilityRepostiory
 */
class AccommodationFacilityRepository {
  /**
   * Trip Model constructor
   *
   * @description constructor handles the properties/univsersal data for our requestRepository
   *
   * @constructor
   *
   */
  constructor() {
    this.db = AccommodationFacility;
  }

  /**
 * @description create handles method that query our database
 *
 * @param {object} accommodationDetails refers to the details of the user's accommodation
 *
 * @returns {object} the details of the accommodation that was created
 */
  async create(accommodationDetails) {
    try {
      const { dataValues } = await this.db.create(accommodationDetails);
      return dataValues;
    } catch (err) {
      throw new Error(err);
    }
  }

  
  /**
 * @description getById is a function that search for an accommodation
 *
 * @param {object} condition limits the search of the accommodation
 *
 * @returns {object} the details of the accommodation that has been searched for
 */
  async getById(condition) {
    try {
      const accommodationDetails = await this.db.findOne({ where: condition });
      return accommodationDetails;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * @description Returns user's trip request information based on the provided parameters
   *
   * @param {Object} condition checks trip request required parameter for a user
   *
   * @return {Object} returns trip request details
   */
  async getAll() {
    try {
      const accommodations = this.db.findAll({ where: { is_approved: false } });
      return accommodations;
    } catch (err) {
      throw new Error(err);
    }
  }
  
  /**
   * @description Returns user's trip request information based on the provided parameters
   *
   * @param {Object} condition checks trip request required parameter for a user
   *
   * @return {Object} returns trip request details
   */
  async getAllApproved() {
    try {
      return await this.db.findAll({ where: { is_approved: true } });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description getOne methods returns accommodation details
   *
   * @param {Object} condition checks required accommodation parameter
   *
   * @param {Object} include adds users managers
   *
   * @return {Object} returns accommodation details with all rooms details
   */
  async getOne(condition = {}, include = '') {
    try {
      const data = await this.db.findOne({ where: condition, include });
      if (data.is_approved !== true) return {};
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * @description approveAccommodation method approves accommodation facility
   *
   * @param {Object} uuid 
   *
   * @return {Object} returns accommodation details with all rooms details
   */
  async approveAccommodation(uuid) {
    try {
      const update = await this.db.update(
        { is_approved: true },
        { where: { uuid }, returning: true, plain: true }
      );
      return update;
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default new AccommodationFacilityRepository();
