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
    deletedAt: {
      type: DataTypes.DATE,
      field: 'deleted_at'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    },
  }, { paranoid: true });
  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_uuid',
      onDelete: 'CASCADE'
    });
  };
  return Comment;
};
