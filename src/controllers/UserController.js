/**
 * UserController.
 */
class UserController {
  /**
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {object} returns the response object
 */
  static signup(req, res) {
    res.status(200).send({
      status: 'success',
      message: 'User registration endpoint'
    });
  }
}

export default UserController;
