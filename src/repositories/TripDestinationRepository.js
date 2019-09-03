import Models from '../models';

const { TripDestination } = Models;

/**
 * @description DestinationRepository handles method that query our database
 */
class DestinationRepository {
  /**
   * @description constructor handles the properties/univsersal data for our DestinationRepository
   */
  constructor() {
    this.db = TripDestination;
  }

  /**
 * @description create is a function that handles the creation a destination
 *
 * @param {object} destinationDetails refers to the destination data
 *
 * @returns {object} the details of the request that was created
 */
  async create(destinationDetails) {
    try {
      const { dataValues } = await this.db.create(destinationDetails);
      return dataValues;
    } catch (err) {
      throw new Error(err);
    }
  }
}


export default new DestinationRepository();
