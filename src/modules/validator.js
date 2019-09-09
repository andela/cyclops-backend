import moment from 'moment';
import { getMIlliSeconds, getDay } from '../utils';

/**
 *
 * @description magicTrimmer removes leadng and trailing spaces from a string
 *
 * @param {payload} payload is the object that contains the data you want to trim
 *
 */

export const magicTrimmer = payload => {
  const data = {};
  if (payload) {
    Object.keys(payload).forEach((key) => {
      const value = payload[key];
      Object.assign(data, { [key]: value.trim() });
    });
    Object.assign(payload, data);
  }
  return payload;
};

/**
   *
   * @description inValidName is function which validates a name
   *
   * @param {name} name is the eniity you want to validate
   *
   * @param {value} value is the data yur want to validate
   *
   * @returns {boolean} return true or false
   */
export const inValidName = (name, value) => {
  if (!value) return `${name} is required`;
  if (!/^[A-Za-z]+\s([A-Za-z]+\s)?[A-Za-z]+$/.test(value)) return `${name} is not valid`;
  return false;
};

/**
   * @description inValidEmail is a function that validates an email
   *
   * @param {email} email is the data you want to verify if its a valid email
   *
   * @returns {string} string is type of data thr function returns
   */
export const inValidEmail = email => {
  if (!email) return 'email is required';
  email = email.toLowerCase();
  if (!/^[A-Za-z0-9.-_]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email)) return 'email is not valid';
  return false;
};

/**
   *
   * @description inValidPassword is a function that validates a password
   *
   * @param {string} password is the data you want to validate whether it is alphanumeric
   *
   * @returns {string} string is the type of data the function returns
   */
export const inValidPassword = password => {
  if (!password) return 'password is required';
  if (password.length < 8) return 'password should be at least eight characters';
  if (!/\d/.test(password) || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/^[a-zA-Z0-9]+$/.test(password)) {
    return 'password should contain at least one Uppercase letter, one lowercase letter, and at least one digit with now space';
  }
  return false;
};

/**
   *
   * @description inValidDate is a function that validates a date
   *
   * @param {string} date is the data you want to validate
   *
   * @returns {string} string is the type of data the function returns
   */

export const inValidDate = (date) => {
  if (!date) return undefined;
  const decision = moment(date, 'MM/DD/YYYY', true).isValid();
  if (!decision) return 'date should be of the form MM/DD/YYYY';
  return false;
};

export const inValidDateComparison = (travelDate, returnDate) => {
  const travelDateMilliSec = getMIlliSeconds(travelDate);
  const todayDateMilliSec = getMIlliSeconds();
  const travelDay = getDay(travelDate);
  const returnDay = getDay(returnDate);
  if (travelDateMilliSec <= todayDateMilliSec) return 'Your travel date must be a future date';
  if (returnDay < travelDay) return 'You cannot enter a return date that is before your travel date';
  return false;
};

export const inValidReturnType = (condition, payload) => {
  if (!payload) return undefined;
  const types = condition === 'request type' ? ['oneWayTrip', 'returnTrip'] : ['singleCity', 'multiCity'];
  const [type1, type2] = types;
  if (!types.includes(payload)) return `${condition} must be either ${type1} or ${type2}`;
  return false;
};

export const inValidLocationId = (locationId) => {
  if (!locationId) return undefined;
  if (!/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(locationId)) {
    return 'Your departure/destination should contain the uuid of the office location';
  }
  return false;
};

export const validate = obj => {
  const result = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      result[key] = obj[key];
    }
    if (obj[key] === undefined) {
      result[key] = `${key} is required`;
    }
  });
  if (Object.keys(result).length) {
    return result;
  }
  return null;
};
