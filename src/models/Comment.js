export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    message: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {});
  Comment.associate = (models) => {
    Comment.belongsTo(models.TripRequest, {
      as: 'tripDetails',
      foreignKey: 'trip_request_uuid',
      onDelete: 'CASCADE'
    });
    Comment.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_uuid',
      onDelete: 'CASCADE'
    });
  };
  return Comment;
};
