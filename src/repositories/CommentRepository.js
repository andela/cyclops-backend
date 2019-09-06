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

  /**
 * @description findByID handles method that search for a particular comment
 *
 * @param {object} condition refers to the details of your search
 *
 * @returns {object} the details of the request that was created
 */
  async findById(condition) {
    try {
      const commentDetails = await this.db.findOne({ where: condition });
      return commentDetails;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
 * @description updateOne method that query our database
 *
 * @param {object} data refers to the an object that contains the column/data you want to update
 *
 * @param {object} condition refers to the an object that contains the 
 *
 * @returns {object} the details of the comment that was created
 */
  async updateOne(data, condition) {
    try {
      const [rowsUpdate, updatedData] = await this.db.update(
        data, { returning: true, where: condition }
      );
      return [updatedData, rowsUpdate];
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new CommentRepository();
