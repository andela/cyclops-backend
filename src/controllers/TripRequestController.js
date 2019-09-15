import UserRepository from '../repositories/UserRepository';
import OfficeLocationRepository from '../repositories/OfficeLocationRepository';
import TripRequestRepository from '../repositories/TripRequestRepository';
import TripDestinationRespository from '../repositories/TripDestinationRepository';
import NotificationRepository from '../repositories/NotificationRepository';
import { createMessage, updateMessage } from '../utils/index';

import { sendErrorResponse, sendSuccessResponse } from '../utils/sendResponse';

/**
 * @description TripRequestController handles all logic pertains to rtrip request
 */
class TripRequestController {
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
    } catch (err) {
      next(err);
    }
  }

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
      const { manager } = await UserRepository.getOne({ uuid: req.userData.uuid }, ['manager']);
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
      // creating the trip request
      const tripRequestDetails = await TripRequestRepository.create(tripRequest);
      const { uuid: tripRequestUuid } = tripRequestDetails;
      const tripDestinationDetails = {
        trip_request_uuid: tripRequestUuid,
        office_location_uuid: tripRequest.destination
      };
      // updating destination for trip request and creating notifications for manager
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
 *
 * @returns {object} it returns a response that is an object
 */
  static oneWayTripCreator(req, res) {
    try {
      return sendSuccessResponse(res, 200, 'oneWayTrip still in progress');
    } catch (err) {
      // return sendErrorResponse(res, 500, 'Internal Server Error');
    }
  }
  /**
   * 
   * @param {object} req  request body
   * @param {object} res response body
   */ 

  // eslint-disable-next-line require-jsdoc
  static async approveRequest(req, res) {
    const { tripRequestUuid } = req.params;
    // console.log(tripRequestUuid, 'dfdff');
    
    try {
      const userRole = req.userData.role;
      if (userRole !== 'Manager') return sendErrorResponse(res, 403, 'Managers only are allowed to approve request');
      const ManagersUuid = req.userData.uuid;
      const foundTripRequest = await TripRequestRepository.findById(tripRequestUuid);
      if (!foundTripRequest) return sendErrorResponse(res, 404, 'Trip request not found');
      const {
        // eslint-disable-next-line max-len
        user_uuid: userUuid, status, request_type: requestType, travel_reasons: travelReasons, trip_plan: tripPlan 
      } = foundTripRequest.dataValues;
      const foundUser = await UserRepository.findById(userUuid);
      const managerUuid = foundUser.dataValues.manager_uuid;
      const managerTable = await TripRequestRepository.findManagerById(managerUuid);
      const managerUserUuid = managerTable.dataValues.user_uuid;
      if (managerUserUuid !== ManagersUuid) return sendErrorResponse(res, 401, 'User\'s managers only can approve a request');
      if (status !== ('pending' || 'open')) return sendErrorResponse(res, 400, 'Can only approve an open or pending request');
      const message = `Your ${tripPlan} ${requestType} for ${travelReasons} has been approved`;
      const currentStatus = 'unread';
      const notificationType = 'tripRequest';
      await updateMessage({ status: 'accepted' }, tripRequestUuid);
      await createMessage(message, currentStatus, notificationType, userUuid);
      return sendSuccessResponse(res, 200, message);
    // eslint-disable-next-line no-empty
    } catch (error) {
    }
  }
}

export default TripRequestController;
