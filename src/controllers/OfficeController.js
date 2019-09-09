import OfficeLocationRepository from '../repositories/OfficeLocationRepository';
import { sendSuccessResponse } from '../utils/sendResponse';

/**
 * @description OfficeLocationController handles all logic pertains to rtrip request
 */
class OfficeController {
/**
 * @description getOfficeLocations is a method that handles the logic to get office Location
 *
 * @param {object} req is the request object
 *
 * @param {object} res is the response object
 *
 * @param {function} next forwards request to the next middleware in the czall stack
 *
 * @returns {object} it returns a response that is an object
 */
  static async getOfficeLocations(req, res, next) {
    try {
      const OfficeLocations = await OfficeLocationRepository.findAll();
      const offices = OfficeLocations.map((officeLocation) => {
        const { dataValues } = officeLocation;
        return dataValues;
      });
      return sendSuccessResponse(res, 200, offices);
    } catch (err) {
      return next(err);
    }
  }
}

export default OfficeController;
