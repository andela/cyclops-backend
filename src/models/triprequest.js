export default (sequelize, DataTypes) => {
  const TripRequest = sequelize.define('TripRequest', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    trip_plan: {
      type: DataTypes.ENUM('singleCity', 'multiCity'),
      defaultValue: 'singleCity'
    },
    request_type: {
      type: DataTypes.ENUM('oneWayTrip', 'returnTrip'),
      defaultValue: 'oneWayTrip'
    },
    leaving_from: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    travel_date: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    travel_reasons: {
      type: DataTypes.STRING,
      defaultValue: 'Business Assignment',
    },
    destination: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    return_date: {
      allowNull: false,
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'rejected', 'open'),
      defaultValue: 'pending'
    },
    show_profile: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  TripRequest.associate = (models) => {
    TripRequest.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_uuid',
    });
    TripRequest.hasMany(models.TripDestination, {
      as: 'destinations',
      foreignKey: 'trip_request_uuid'
    });
  };
  return TripRequest;
};
