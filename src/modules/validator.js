/**
 *
 * @description magicTrimmer removes leadng and trailing spaces from a string
 *
 */

export const magicTrimmer = (payload) => {
  const data = {};
  if (payload) {
    Object.keys(payload).forEach((key) => {
      const value = payload[key];
      Object.assign(data, { [key]: value.trim() });
    });
    payload = data;
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
  if (!/^[a-zA-Z]+$/.test(value)) return `${name} is not valid`;
  return null;
};
/**
   * @description inValidEmail is a function that validates an email
   *
   * @param {email} email is the data you want to verify if its a valid email
   *
   * @returns {string} string is type of data thr function returns
   */
export const inValidEmail = (email) => {
  if (!email) return 'email is required';
  email = email.toLowerCase();
  if (!/^[A-Za-z0-9.-_]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email)) return 'email is not valid';
  return null;
};

/**
   *
   * @description inValidPassword is a function that validates a password
   *
   * @param {password} password is the data you want to validate whether it is alphanumeric
   *
   * @returns {string} string is the type of data the function returns
   */
export const inValidPassword = (password) => {
  if (!password) return 'password is required';
  if (password.length < 8) return 'password should be at least eight characters';
  if (!/\d/.test(password) || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/^[a-zA-Z0-9]+$/.test(password)) {
    return 'password should contain at least one Uppercase letter, one lowercase letter, and at least one digit';
  }
  return null;
};

export const validate = (obj) => {
  const result = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      result[key] = obj[key];
    }
  });
  if (Object.keys(result).length) {
    return result;
  }
  return null;
};
