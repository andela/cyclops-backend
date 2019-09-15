// eslint-disable-next-line arrow-parens
import models from '../models';
import UserRepository from '../repositories/UserRepository';
import NotificationRepository from '../repositories/NotificationRepository';
import TripRequestRepository from '../repositories/TripRequestRepository';

export const getMIlliSeconds = date => (date ? new Date(date).getTime() : new Date().getTime());

export const getDay = (date) => {
  const dateInMillisec = getMIlliSeconds(date);
  return Math.floor(dateInMillisec / 86400000);
};

const { BlackListedToken } = models;

/**
 *
 * @param {string} token it acepts a valid token
 * @returns {boolean} returns true when token is found otherwise false
 */

const isBlackListed = async (token) => {
  const blockedToken = await UserRepository.findToken({ token });
  return !!blockedToken;
};

/**
 * @param {text} token accepts token
 *
 * @returns {string} returns error when it could not create a user
 */
const blackListThisToken = async (token) => {
  await BlackListedToken.create({
    token,
  });
};
const createMessage = async (message, status, notificationType, userUuid) => {
  const data = {
    message,
    status,
    notification_type: notificationType,
    user_uuid: userUuid,
  };
  NotificationRepository.create(data);
};
const updateMessage = async (changes, tripUuid) => {
  TripRequestRepository.update(changes, tripUuid); 
};
export {
  blackListThisToken, isBlackListed, createMessage, updateMessage
};
