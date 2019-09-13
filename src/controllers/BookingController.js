/* eslint-disable require-jsdoc */
import BookingRepository from '../repositories/BookingRepository';
import { sendErrorResponse, sendSuccessResponse } from '../utils/sendResponse';
import dateRangeGen from '../utils/dateRangeGen';
import RoomRepository from '../repositories/RoomRepository';

/**
 * @description CommentController handles all logic pertaining to comments
 */
class BookingController {
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
  static async create({ body, userData }, res, next) {
    try {
      const {
        starting_date, ending_date, room_uuid
      } = body;
      const room = await RoomRepository.getOne({ uuid: room_uuid });
      if (!room) return sendErrorResponse(res, 400, { message: 'Room does not exist, try again' });
      const user_uuid = userData.uuid;
      const dates = dateRangeGen(starting_date, ending_date);
      if (!dates.length > 0) return sendErrorResponse(res, 400, 'Invalid date');
      const AllBooking = await BookingRepository.getAll({ room_uuid });
      const bookedDates = [...new Set([].concat(...AllBooking.map((o) => o.dates)))];

      const checkAvailability = await BookingController.checkBooking(dates, bookedDates);
      if (checkAvailability.length > 0) return sendErrorResponse(res, 400, { message: `${room.dataValues.name} room is not available on the ${checkAvailability} days` });
      const booking = await BookingRepository.create({
        dates, user_uuid, room_uuid
      });
      return sendSuccessResponse(res, 201, booking);
    } catch (err) {
      return next(err);
    }
  }

  static checkBooking(initial, final) {
    return initial.filter(x => final.includes(x));
  }

  // returns users bookings
  static async index(req, res, next) {
    try {
      const { uuid } = req.userData;
      const booking = await BookingRepository.getAll({ user_uuid: uuid });
      return sendSuccessResponse(res, 200, booking);
    } catch (err) {
      return next(err);
    }
  }
}

export default BookingController;
