export default (sequelize, DataTypes) => {
  const Manager = sequelize.define('Manager', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {});
  Manager.associate = (models) => {
    Manager.belongsTo(models.User, {
      as: 'users',
      foreignKey: 'user_uuid',
      onDelete: 'CASCADE'
    });
  };
  return Manager;
};
