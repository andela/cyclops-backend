import bcrypt from 'bcrypt';
/**
 * Function to hash user password
 * @param {string} password
 * @returns {string} returns encryted password
 */

const hashPassword = (password) => bcrypt.hashSync(password, 10);
/**
 * Function to decrypt a hash password compares it
 * @param {string} password it accepts password
 * @param {string} hashed it accepts user's hashed password
 * @returns {boolean} unhash returns true if comparism is matched
 */
const unhashPassword = (password, hashed) => bcrypt.compareSync(password, hashed);

export { hashPassword, unhashPassword };
