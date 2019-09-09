module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING
  }, {});
  Permission.associate = (models) => {
    Permission.belongsToMany(models.Role, {
      through: 'RolePermission',
      as: 'roles',
      foreignKey: 'permission_id'
    });
  };
  return Permission;
};
