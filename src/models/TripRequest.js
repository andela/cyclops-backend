export default (sequelize, DataTypes) => {
  const TripRequest = sequelize.define('TripRequest', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    trip_plan: {
      type: DataTypes.ENUM('multiCity', 'singleCity'),
      defaultValue: 'singleCity'
    },
    request_type: {
      type: DataTypes.ENUM('oneWayTrip', 'returnTrip'),
      defaultValue: 'oneWayTrip'
    },
    leaving_from: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    travel_date: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    travel_reasons: {
      type: DataTypes.STRING,
      defaultValue: 'Business Assignment',
    },
    return_date: {
      allowNull: true,
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.ENUM('accepted', 'rejected', 'open'),
      defaultValue: 'open'
    },
    show_profile: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {});
  TripRequest.associate = (models) => {
    TripRequest.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_uuid',
      onDelete: 'CASCADE'
    });
    TripRequest.hasMany(models.TripDestination, {
      as: 'destinations',
      foreignKey: 'trip_request_uuid',
      onDelete: 'CASCADE'
    });
    TripRequest.belongsTo(models.OfficeLocation, {
      foreignKey: 'leaving_from',
      as: 'departure'
    });
    TripRequest.hasMany(models.Comment, {
      as: 'comments',
      foreignKey: 'trip_request_uuid',
      onDelete: 'CASCADE'
    });
  };
  return TripRequest;
};
