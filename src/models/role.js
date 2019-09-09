module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING
  }, {});
  Role.associate = (models) => {
    Role.hasMany(models.User, {
      foreignKey: 'role_uuid',
      as: 'roles'
    });
    Role.belongsToMany(models.Permission, {
      through: 'RolePermission',
      as: 'permissions',
      foreignKey: 'role_uuid'
    });
  };
  return Role;
};
