export default (sequelize, DataTypes) => {
  const Manager = sequelize.define('Manager', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
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
