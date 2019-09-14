/* eslint-disable */
import Model from '../models';
import { setHeaders, addHook } from '../utils/NotificationHelpers';
import tripRepository from '../repositories/TripRequestRepository';
import NotificationRepository from '../repositories/NotificationRepository';
import dotenv from 'dotenv';

dotenv.config();

const { Comment } = Model;

/**
 * @description Comment controller
 */
class CommentNotifications {
  /**
   * @param {Object} req - HTTP request object
   *
   * @param {Object} res - HTTP response object
   *
   * @param {Function} next - Function to trigger next middleware
   *
   * @return {Object} Return success message and account creation status
   */

  constructor() {
    this.model = Comment;
  }

  /**
  * @description Add notifications for comment model
  *
  * @param {Object} req - HTTP request object
  *
  * @param {Object} res - HTTP response object
  *
  * @param {Function} next - Function to execute next function
  *
  * @returns {Void} Nothing is been returned. Just sets hooks to a given model
  */
  async create (req, res, next) {
    
    const appBaseURL = process.env['APP_BASE_PATH'];
    let tripsObj = [];
    const currentUserUUID = req.userData.uuid;
    
    // Set HTTP headers for SSE
    setHeaders(req, res);

    try {
      // Get all unread notifications
      const notifs = await NotificationRepository.getAll({
        user_uuid: currentUserUUID, 
        status: 'unread',
        notification_type: 'comment'
      });
     
      // Construct comment summary and link to comment.
      notifs.reduce((trips, currentTrip)=>{
        return tripsObj.push({
          uuid: currentTrip.uuid,
          message: currentTrip.message,
          link: `${appBaseURL}/trips/${currentTrip.uuid}`
        })
      }, tripsObj);
      // Send unread comments to user
      res.write('event: comment\n');
      res.write(`data: ${JSON.stringify(tripsObj)}\n\n`);

      // Method to execute for every comment creation
      const helper = async (comment) => {
        const {dataValues: {trip_request_uuid}} = comment;
      
        const {
          dataValues: {
            user_uuid: requester_id,
            uuid: trip_uuid
          }
        } = await tripRepository.findById({uuid: trip_request_uuid});
        
        if(requester_id == currentUserUUID){
          res.write(`event: comment\n`);
          res.write(`data: ${JSON.stringify({
            message: comment.message,
            link: `${appBaseURL}/trips/${trip_uuid}`
          })}\n\n`);
        }
      }

      // Add realtime notification. Triggered after new comment is created.
      addHook(Comment, 'afterCreate', 'notification', helper);
      
    } catch (error) {
      next(error);
    }
  }
}

export default new CommentNotifications();
