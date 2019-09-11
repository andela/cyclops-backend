export default (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    room_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    room_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accommodation_location_uuid: DataTypes.UUID
  }, {});
  Room.associate = models => {
    Room.belongsTo(models.AccommodationLocation, {
      foreignKey: 'accommodation_location_uuid',
      onDelete: 'CASCADE'
    });
  };
  return Room;
};
