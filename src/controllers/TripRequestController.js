/* eslint-disable camelcase */
import TripRequestRepository from '../repositories/TripRequestRepository';
import { sendSuccessResponse } from '../utils/sendResponse';

/**
 * @description Trip Request controller
 */
export default class TripRequestController {
  /**
   * @param {Object} req - HTTP request object
   *
   * @param {Object} res - HTTP response object
   *
   * @param {Function} next - Function to trigger next middleware
   *
   * @return {Object} Object resoponse with current user created status
   */
  static async tripsByUser(req, res, next) {
    try {
      const user = req.userData.uuid;
      const userTrips = await TripRequestRepository.getAll({ user_uuid: user });
      return sendSuccessResponse(res, 200, userTrips);
    } catch (error) {
      next(error);
    }
  }
}
