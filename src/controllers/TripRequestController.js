import UserRepository from '../repositories/UserRepository';
import OfficeLocationRepository from '../repositories/OfficeLocationRepository';
import TripRequestRepository from '../repositories/TripRequestRepository';
import TripDestinationRespository from '../repositories/TripDestinationRepository';
import NotificationRepository from '../repositories/NotificationRepository';

import { sendErrorResponse, sendSuccessResponse } from '../utils/sendResponse';

/**
 * @description TripRequestController handles all logic pertains to rtrip request
 */
class TripRequestController {
/**
 * @description createRequest is a method that handles the logic to create a request
 *
 * @param {object} req is the request object
 *
 * @param {object} res is the response object
 *
 * @param {function} next forwards request to the next middleware in the czall stack
 *
 * @returns {object} it returns a response that is an object
 */
  static async createTripRequest(req, res, next) {
    const { request_type: requestType, leaving_from: leavingFrom, destination } = req.body;
    try {
      const { manager } = await UserRepository.findOne({ uuid: req.userData.uuid }, ['manager']);
      if (!manager) return sendErrorResponse(res, 403, 'You are not allowed to create a trip request because you don\'t have a manager');
      // obtaining the user_uuid of the user's manager
      req.userData.managerUuid = manager.dataValues.user_uuid;
      const tripDeparture = await OfficeLocationRepository.findById({ uuid: leavingFrom });
      if (!tripDeparture) return sendErrorResponse(res, 404, 'The office location you are leaving from does not exist');
      const tripDestination = await OfficeLocationRepository.findById({ uuid: destination });
      if (!tripDestination) return sendErrorResponse(res, 404, 'The office location you are going to does not exist');
      // transfering control the TripRequestController based on the type of trip request
      return (requestType === 'oneWayTrip') ? TripRequestController.oneWayTripCreator(req, res, next)
        : TripRequestController.returnTripCreator(req, res, next);
    } catch (err) {
      return next(err);
    }
  }

  /**
 * @description createRequest is a method that handles the logic to create a request
 *
 * @param {object} req is the details of the request
 *
 * @param {object} res is the response object
 *
 * @param {function} next forwards request to the next middleware in the call stack
 *
 * @returns {object} it returns a response that is an object
 */
  static async returnTripCreator(req, res, next) {
    try {
      const tripRequest = { ...req.body, user_uuid: req.userData.uuid };
      const { destination } = req.body;
      // creating the trip request
      const tripRequestDetails = await TripRequestRepository.create(tripRequest);
      const { uuid: tripRequestUuid } = tripRequestDetails;
      const tripDestinationDetails = {
        trip_request_uuid: tripRequestUuid,
        office_location_uuid: destination
      };
      // updating destination for trip request and creating notificationsfor manager
      const { managerUuid } = req.userData;
      const [destinated, managerNotified] = await Promise.all(
        [TripDestinationRespository.create(tripDestinationDetails),
          NotificationRepository.create({ user_uuid: managerUuid })]
      );
      if (destinated && managerNotified) {
        return sendSuccessResponse(res, 201, { 
          message: 'Your trip request has been created successfully',
          trip_request_uuid: tripRequestUuid 
        });
      }
    } catch (err) {
      return next(err);
    }
  }

  /**
 * @description createRequest is a method that handles the logic to create a request
 *
 * @param {object} req is the details of the request
 *
 * @param {object} res is the response object
 *
 * @param {function} next forwards request to the next middleware in the call stack
 *
 * @returns {object} it returns a response that is an object
 */
  static oneWayTripCreator(req, res, next) {
    try {
      return sendSuccessResponse(res, 200, 'oneWayTrip still in progress');
    } catch (err) {
      next(err);
    }
  }
}

export default TripRequestController;
