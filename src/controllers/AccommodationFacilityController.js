import AccommodationFacilityRepository from '../repositories/AccommodationFacilityRepository';
import RoomRepository from '../repositories/RoomRepository';
import { convertToArray } from '../utils';
import { sendErrorResponse, sendSuccessResponse } from '../utils/sendResponse';

/**
 * @description AccommodationFacilityController handles all accommodation logics
 */
class AccommodationFacilityController {
  /**
 * @description createAccommodation handles the logic to create an accommodation facility
 *
 * @param {object} req is the request object
 *
 * @param {object} res is the response object
 *
 * @param {function} next forwards request to the next middleware in the call stack
 *
 * @returns {object} it returns a response that is an object
 */
  static async createAccommodation(req, res, next) {
    try {
      const { 
        name, description, image_url: imageUrl, location, amenities, services,
      } = req.body;

      const groupedServices = convertToArray(services);
      const groupedAmenities = convertToArray(amenities);
      const groupedImageUrl = convertToArray(imageUrl);
      
      const createAccommodation = {
        user_uuid: req.userData.uuid,
        name, 
        description, 
        location,
        image_url: groupedImageUrl,
        amenities: groupedAmenities,
        services: groupedServices,
      };

      const createdAccommodation = await AccommodationFacilityRepository
        .create(createAccommodation);

      const roomDetails = { 
        accommodation_uuid: createdAccommodation.uuid,
        name: req.body.room_name,
        type: req.body.room_type,
        cost: req.body.cost
      };

      const createdRoom = (roomDetails.name) ? await RoomRepository.create(roomDetails) : undefined;
      
      return sendSuccessResponse(res, 201, { ...createdAccommodation, room: createdRoom });
    } catch (err) {
      return next(err);
    }
  }

  /**
     * @param {Object} req - HTTP request object
     *
     * @param {Object} res - HTTP response object
     *
     * @param {Function} next - Function to trigger next middleware
     *
     * @return {Object} Object resoponse with current user created status
     */
  static async getAllAccommodation(req, res, next) {
    try {
      const userTrips = await AccommodationFacilityRepository.getAll();
      return sendSuccessResponse(res, 200, userTrips);
    } catch (err) {
      return next(err);
    }
  }

  /**
   *  @description getOneAccommodation method gets all created accommodations
   * 
     * @param {Object} req - HTTP request object
     *
     * @param {Object} res - HTTP response object
     *
     * @param {Function} next - Function to trigger next middleware
     *
     * @return {Object} Object resoponse with current user created status
     */
  static async getOneAccommodation(req, res, next) {
    try {
      const { accommodationUuid } = req.params;
      const accommodation = await AccommodationFacilityRepository
        .getById({ uuid: accommodationUuid });

      if (!accommodation) return sendErrorResponse(res, 404, 'This accommodation facility does not exist');

      const accommodationFacility = await AccommodationFacilityRepository
        .getOne({ uuid: accommodationUuid }, ['rooms']);
      return sendSuccessResponse(res, 200, accommodationFacility);
    } catch (err) {
      return next(err);
    }
  }

  /**
 * @description createRoom is a method that handles the logic to create a room
 *
 * @param {object} req is the request object
 *
 * @param {object} res is the response object
 *
 * @param {function} next forwards request to the next middleware in the czall stack
 *
 * @returns {object} it returns a response that is an object
 */
  static async createRoom(req, res, next) {
    try {
      const { accommodation_uuid: accommmodationUuid } = req.body;
      const accommodation = await AccommodationFacilityRepository
        .getById({ uuid: accommmodationUuid });

      if (!accommodation) return sendErrorResponse(res, 404, 'This accommodation facility does not exist');

      const createdRoom = await RoomRepository.create(req.body);
      return sendSuccessResponse(res, 201, createdRoom);
    } catch (err) {
      return next(err);
    }
  }
}

export default AccommodationFacilityController;
