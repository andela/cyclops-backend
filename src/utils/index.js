import bcrypt from 'bcrypt';

/**
 * Function to hash user password
 * @param {string} password
 * @returns {string} returns encryted password
 */
const hashPassword = (password) => bcrypt.hashSync(password, 10);

export default hashPassword;
