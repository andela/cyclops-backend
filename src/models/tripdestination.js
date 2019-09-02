export default (sequelize, DataTypes) => {
  const TripDestination = sequelize.define('TripDestination', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
  }, {});
  TripDestination.associate = (models) => {
    TripDestination.belongsTo(models.OfficeLocation, {
      as: 'office',
      foreignKey: 'office_location_uuid',
      onDelete: 'CASCADE'
    });
  };
  return TripDestination;
};
