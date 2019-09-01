export default (sequelize, DataTypes) => {
  const TripDestination = sequelize.define('TripDestination', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    trip_uuid: {
      type: DataTypes.UUID,
      references: {
        model: 'TripRequest',
        key: 'uuid',
        as: 'trip',
      }
    },
    office_location_uuid: {
      type: DataTypes.UUID,
      references: {
        model: 'OfficeLocation',
        key: 'uuid',
        as: 'office_location',
      }
    },
    accommodation_uuid: DataTypes.UUID
  }, {});
  TripDestination.associate = (models) => {
    // associations can be defined here
    // TripDestination.belongsTo(models.TripRequest, {
    //   foreignKey: 'uuid',
    //   onDelete: 'CASCADE'
    // });
    TripDestination.belongsTo(models.OfficeLocation, {
      foreignKey: 'office_location_uuid',
      as: 'office',
      onDelete: 'CASCADE'
    });
  };
  return TripDestination;
};
