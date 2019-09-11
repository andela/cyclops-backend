export default (sequelize, DataTypes) => {
  const AccommodationLocation = sequelize.define('AccommodationLocation', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: DataTypes.STRING,
  }, {});
  AccommodationLocation.associate = models => {
    AccommodationLocation.hasMany(models.Room, {
      foreignKey: 'accommodation_location_uuid',
      as: 'rooms'
    });
  };
  return AccommodationLocation;
};
