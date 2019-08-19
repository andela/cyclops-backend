/**
 * UserController.
 */
class UserController {
  /**
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {object} returns the response object
 */
  static register(req, res) {
    res.status(200).send({
      status: 'success',
      message: 'User registration endpoint'
    });
  }

  /**
   * @param {object} req The request object
   * @param {object} res The response object
   * @returns {object}  returns the response object
   */
  static login(req, res) {
    res.status(200).send({
      status: 'success',
      message: 'User login endpoint'
    });
  }

  /**
   * @param {object} req The request object
   * @param {object} res The response object
   * @returns {object}  returns the response object
   */
  static index(req, res) {
    res.status(200).send({
      status: 'success',
      message: 'User index page'
    });
  }
}

export default UserController;
