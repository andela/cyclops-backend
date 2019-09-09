import {
  validate, inValidDate, inValidReturnType, inValidLocationId, inValidDateComparison, isRequired,
} from '../modules/validator';
import { sendErrorResponse } from '../utils/sendResponse';

/**
 * @description userAuth is clas that handles user data validation
 */
export default class requestValidator {
  /**
   *
   * @param {req} req object
   *
   * @param {res} res object
   *
   * @param {next} next forwards request to the next middleware function
   *
   * @returns {obj} reurns an response object
   */
  static returnTrip(req, res, next) {
    const {
      request_type: requestType, trip_plan: tripPlan, leaving_from: leavingFrom,
      return_date: returnDate, travel_date: travelDate, destination,
    } = req.body;

    const schema = {
      request_type: inValidReturnType('request type', requestType),
      trip_plan: inValidReturnType('trip plan', tripPlan),
      leaving_from: inValidLocationId(leavingFrom),
      return_date: inValidDate(returnDate),
      travel_date: inValidDate(travelDate),
      destination: inValidLocationId(destination),
    };

    const dateSchema = {
      return_date: inValidDateComparison(travelDate, returnDate)
    };

    const error = validate(schema);
    if (error) return sendErrorResponse(res, 422, error);
    const dateErrors = validate(dateSchema);
    if (dateErrors) return sendErrorResponse(res, 422, dateErrors);
    return next();
  }

  
  /**
   *
   * @param {req} req object
   *
   * @param {res} res object
   *
   * @param {next} next forwards request to the next middleware function
   *
   * @returns {obj} reurns an response object
   */
  static createComment(req, res, next) {
    const { message } = req.body;

    const schema = {
      message: isRequired(message)
    };

    const error = validate(schema);
    if (error) return sendErrorResponse(res, 422, error);
    return next();
  }
}
