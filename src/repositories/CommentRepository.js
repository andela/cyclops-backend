import Models from '../models';

const { Comment } = Models;

/**
 * @description CommentRepository handles method that query our database
 */
class CommentRepository {
  /**
   * @description constructor handles the properties/univsersal data for our requestRepository
   */
  constructor() {
    this.db = Comment;
  }

  /**
 * @description createhandles method that query our database
 *
 * @param {object} commentDetails refers to the Comment data
 *
 * @returns {object} the details of the comment that was created
 */
  async create(commentDetails) {
    try {
      const { dataValues } = await this.db.create(commentDetails);
      return dataValues;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new CommentRepository();
