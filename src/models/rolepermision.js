module.exports = (sequelize, DataTypes) => {
  const RolePermission = sequelize.define('RolePermission', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    role_id: DataTypes.UUID,
    permission_id: DataTypes.UUID
  }, {});
  RolePermission.associate = () => {
    // associations can be defined here
  };
  return RolePermission;
};
