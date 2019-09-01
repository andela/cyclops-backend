export default (sequelize, DataTypes) => {
  const OfficeLocation = sequelize.define('OfficeLocation', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  OfficeLocation.associate = () => {
    // associations can be defined here
  };
  return OfficeLocation;
};
