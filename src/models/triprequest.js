export default (sequelize, DataTypes) => {
  const TripRequest = sequelize.define('TripRequest', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_uuid: {
      type: DataTypes.UUID,
      references: {
        model: 'User',
        key: 'uuid',
        as: 'user',
      }
    },
    leaving_from: DataTypes.STRING,
    reasons: DataTypes.STRING,
    travel_date: DataTypes.DATE,
    return_date: DataTypes.DATE,
    request_type: {
      type: DataTypes.ENUM('oneWayTrip', 'returnTrip'),
      defaultValue: 'oneWayTrip'
    },
    trip_plan: {
      type: DataTypes.ENUM('single', 'multiCity'),
      defaultValue: 'single'
    },
    status: {
      type: DataTypes.ENUM('open', 'pending', 'cancelled', 'rejected', 'approved'),
      defaultValue: 'open'
    },
    show_profile: DataTypes.BOOLEAN
  }, {});
  TripRequest.associate = (models) => {
    // associations can be defined here
    TripRequest.belongsTo(models.User, {
      foreignKey: 'user_uuid',
      as: 'user',
      onDelete: 'CASCADE'
    });
    TripRequest.hasMany(models.TripDestination, {
      foreignKey: 'trip_uuid',
      as: 'destinations',
      onDelete: 'CASCADE'
    });
  };
  return TripRequest;
};
