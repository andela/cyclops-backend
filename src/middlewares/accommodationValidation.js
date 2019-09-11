/* eslint-disable class-methods-use-this */
// import AccommodationRepository from '../repositories/AccommodationRepository';
import { sendErrorResponse } from '../utils/sendResponse';

/**
 * @module ValidateAccommodations
 */
class ValidateAccommodations {
  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns {function} returns the next function
   */
  validateAcc(req, res, next) {
    if (!req.body.name) return sendErrorResponse(res, 400, 'Accommodation name is required');
    if (!req.body.location) return sendErrorResponse(res, 400, 'The location of the accommodation is required');
    if (!req.body.image_url) return sendErrorResponse(res, 400, 'An image of the accommodation is required');
    next();
  }

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @return {function} returns the next function
   */
  validateRoom(req, res, next) {
    if (!req.body.room_name) return sendErrorResponse(res, 400, 'Room name is required');
    if (!req.body.room_type) return sendErrorResponse(res, 400, 'Room type is required');
    next();
  }
}

export default new ValidateAccommodations();
