import models from '../models';

const { AccommodationLocation, Room } = models;

/**
 * @module AccommodationRepository
 */
class AccommodationRepository {
  /**
   * @description instantiates our repository with our models
   */
  constructor() {
    this.Room = Room;
    this.AccommodationLocation = AccommodationLocation;
  }

  /**
   * 
   * @param {*} AccommodationLocationData
   * 
   * @return {*} returns an object of the accommodation location
   */
  async createAcc(AccommodationLocationData) {
    try {
      const accommodationLocation = await this.AccommodationLocation
        .create(AccommodationLocationData, {
          returning: true,
          plain: true
        });
      return accommodationLocation;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * @returns {object} returns all Accommodation locations
   */
  async getAllAcc() {
    try {
      const accommodationLocations = await this.AccommodationLocation.findAll({
        include: [{
          model: this.Room,
          as: 'rooms'
        }]
      });
      return accommodationLocations;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * 
   * @param {object} roomData 
   * 
   * @returns {object} returns a room object
   */
  async createAccRoom(roomData) {
    try {
      const room = await this.Room.create({
        accommodation_location_uuid: roomData.accommodation_location_uuid,
        room_name: roomData.room_name,
        room_type: roomData.room_type
      }, {
        returning: true,
        plain: true
      });
      return room;
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default new AccommodationRepository();
