import UserRepository from '../repositories/UserRepository';
import CommentRepository from '../repositories/CommentRepository';
import TripRequestRepository from '../repositories/TripRequestRepository';

import { sendSuccessResponse, sendErrorResponse } from '../utils/sendResponse';


/**
 * @description CommentController handles all logic pertaining to comments
 */
class CommentController {
/**
 * @description CreateTripRequestComment method handles the logic to get comment on a trip request
 *
 * @param {object} req is the request object
 *
 * @param {object} res is the response object
 *
 * @param {function} next forwards request to the next middleware in the czall stack
 *
 * @returns {object} it returns a response that is an object
 */
  static async createTripRequestComment(req, res, next) {
    const checkrequestOwner = async (tripRequestOwner, userUuid, userRole) => {
      if (userRole === 'Manager') {
        const { manager } = await UserRepository.getOne({ uuid: tripRequestOwner }, ['manager']);
        const { uuid: tripRequestOwnerManager } = manager.dataValues;
        return (userUuid === tripRequestOwnerManager);
      }
      return (userUuid === tripRequestOwner); 
    };

    try {
      const { uuid: userUuid, role: userRole } = req.userData;
      const { trip_request_uuid: tripRequestUuid, message } = req.body;

      // checking for trip request
      const tripRequestDetails = await TripRequestRepository.findById({ uuid: tripRequestUuid });
      if (!tripRequestDetails) return sendErrorResponse(res, 404, 'This trip request does not exist');
      const { user_uuid: tripRequestOwner } = tripRequestDetails;
      // ensuring ownership
      const isAllowed = await checkrequestOwner(tripRequestOwner, userUuid, userRole);
      if (!isAllowed && userRole === 'Manager') return sendErrorResponse(res, 403, 'You are not the manager of the user that created this trip request');
      if (!isAllowed && userRole !== 'Manager') return sendErrorResponse(res, 403, 'You can\'t comment on a trip request you did not create');
      // creating comment
      const commentDetails = {
        user_uuid: userUuid,
        trip_request_uuid: tripRequestUuid,
        message
      };
      const createdComment = await CommentRepository.create(commentDetails);
      return sendSuccessResponse(res, 201, createdComment);
    } catch (err) {
      return next(err);
    }
  }
}

export default CommentController;
