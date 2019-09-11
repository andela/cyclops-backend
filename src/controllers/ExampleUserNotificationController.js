/* eslint-disable */
import Model from '../models';
import { setHeaders, addHook } from '../utils/NotificationHelpers';

const { User } = Model;

/**
 * @description User controller
 */
class UserNotifications {
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
    this.model = User;
  }

  /**
  * @description Add notifications for user model
  *
  * @param {Object} req - HTTP request object
  *
  * @param {Object} res - HTTP response object
  *
  * @param {Function} next - Function to execute next function
  *
  * @returns {Void} Nothing is been returned. Just sets hooks to a given model
  */
  async create(req, res, next) {
    setHeaders(req, res);
    try {
      // Add realtime notification. Triggered after new user is created.
      addHook(User, 'afterCreate', 'notification', (user) => {
        const { uuid } = user;
        res.write(`id: ${uuid}\n`);
        res.write('data: User created successfully\n');
        res.write(`data: User details : ${JSON.stringify(user)}\n\n`);
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @description  Add notification for user update
   *
   * @param {Object} req - HTTP request object
   *
   * @param {Object} res - HTTP response object
   *
   * @param {Function} next - Functoin to trigger next function
   */
  async update(req, res, next){

    setHeaders(req, res);
    try{
      // Add realtime notification. Triggered before new user is created.
      addHook(User, 'beforeCreate', 'notification', () => {
        res.write('id: 1\n');
        res.write('data: This is triggered before user creation\n\n');
      });
    }catch(error){
      next(error)
    }
  }
}

export default new UserNotifications();
