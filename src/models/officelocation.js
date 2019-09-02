export default (sequelize, DataTypes) => {
  const OfficeLocation = sequelize.define('OfficeLocation', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING
  }, {});
  OfficeLocation.associate = () => {
  };
  return OfficeLocation;
};
