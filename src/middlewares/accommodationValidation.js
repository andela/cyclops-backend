import {
  validate, isRequired, inValidImageType, inValidCostType,
} from '../modules/validator';
import { sendErrorResponse } from '../utils/sendResponse';

/**
 * @description AccommodationFacilityValidator is clas that handles user data validation
 */
export default class AccommodationFacilityValidator {
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
  static createAccommodation(req, res, next) {
    const {
      name, description, image_url: imageUrl, location, services, amenities, 
      room_name: roomName, room_type: roomType, cost
    } = req.body;
     
    let addedSchema;
    const schema = {
      name: isRequired(name),
      description: isRequired(description),
      image_url: inValidImageType(imageUrl),
      location: isRequired(location),
      amenities: isRequired(amenities),
      services: isRequired(services),
    };

    if (roomName || roomType || cost) {
      addedSchema = {
        room_name: isRequired(roomName),
        room_type: isRequired(roomType),
        cost: inValidCostType(cost)
      };
    }

    const updatedSchema = { ...schema, ...addedSchema };

    const error = validate(updatedSchema);
    if (error) return sendErrorResponse(res, 422, error);
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
  static createRoom(req, res, next) {
    const {
      accommodation_uuid: accommodationUuid, name, type, cost,
    } = req.body;

    const schema = {
      accommodation_uuid: isRequired(accommodationUuid),
      name: isRequired(name),
      type: isRequired(type),
      cost: inValidCostType(cost)
    };

    const error = validate(schema);
    if (error) return sendErrorResponse(res, 422, error);
    return next();
  }
}
