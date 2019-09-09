import Models from '../models';

const { OfficeLocation } = Models;

/**
 * @description OfficeRepository handles method that query our database
 */
class OfficeRepository {
  /**
   * @description constructor handles the properties/univsersal data for our OfficeRepostiory
   */
  constructor() {
    this.db = OfficeLocation;
  }

  /**
 * @description findOne is a function that search for an office Location
 *
 * @param {object} condition limits the search of the office location
 *
 * @returns {object} the details of the office location that has been searched for
 */
  async findById(condition) {
    try {
      const officeLocation = await this.db.findOne({ where: condition });
      return officeLocation;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
 * @description findAll handles method that query our database
 *
 * @returns {object} the details of the request that was created
 */
  async findAll() {
    try {
      const officeLocations = await this.db.findAll();
      return officeLocations;
    } catch (err) {
      throw new Error(err);
    }
  }
}


export default new OfficeRepository();
