import Models from '../models';

const { TripRequest } = Models;

/**
 * @description RequestRepository handles method that query our database
 */
class RequestRepository {
  /**
   * @description constructor handles the properties/univsersal data for our requestRepository
   */
  constructor() {
    this.db = TripRequest;
  }

  /**
 * @description RequestRepository handles method that query our database
 *
 * @param {objecct} requestDetails refers to the details of the user's request
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
}


export default new RequestRepository();
