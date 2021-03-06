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
      const tripRequestDetails = await TripRequestRepository.findById({ uuid: tripRequestUuid });
      if (!tripRequestDetails) return sendErrorResponse(res, 404, 'This trip request does not exist');
      const { user_uuid: tripRequestOwner } = tripRequestDetails;

      const isAllowed = await checkrequestOwner(tripRequestOwner, userUuid, userRole);
      if (!isAllowed && userRole === 'Manager') return sendErrorResponse(res, 403, 'You are not the manager of the user that created this trip request');
      if (!isAllowed && userRole !== 'Manager') return sendErrorResponse(res, 403, 'You can\'t comment on a trip request you did not create');
    
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

  /**
 * @description editTripRequestComment method handles the logic to get comment on a trip request
 *
 * @param {object} req is the request object
 *
 * @param {object} res is the response object
 *
 * @param {function} next forwards request to the next middleware in the czall stack
 *
 * @returns {object} it returns a response that is an object
 */
  static async editTripRequestComment(req, res, next) {
    try {
      const { uuid: userUuid } = req.userData;
      const { message } = req.body;
      const { commentUuid } = req.params;

      const comment = await CommentRepository.getOne({ uuid: commentUuid });
      if (!comment) return sendErrorResponse(res, 404, 'This comment does not exist');
      const { dataValues } = comment;

      if (userUuid !== dataValues.user_uuid) return sendErrorResponse(res, 403, 'You can\'t edit a comment you didn\'t post');
      const [editedComment] = await CommentRepository.updateOne({ message }, { uuid: commentUuid });
      if (editedComment) return sendSuccessResponse(res, 200, ...editedComment);
    } catch (err) {
      return next(err);
    }
  }

  /**
   * @description deletes the users comment from display
   *
   * @param {object} req contains the comment details and requester
   *
   * @param {object} res is the response object
   *
   * @param {function} next forwards request to the next middleware in the call stack
   *
   * @returns {object} it returns a response that is an object
   */
  static async delete(req, res, next) {
    try {
      const { uuid } = req.params;
      const comment = await CommentRepository.getOne({ uuid });
      if (!comment) return sendErrorResponse(res, 404, 'This comment does not exist');
      if (comment.dataValues.user_uuid !== req.userData.uuid) return sendErrorResponse(res, 401, 'You are not allowed to perform this action');
      await CommentRepository.delete({ uuid });
      return sendSuccessResponse(res, 200, { message: 'Comment deleted successful' });
    } catch (err) {
      return next(err);
    }
  }
}

export default CommentController;
