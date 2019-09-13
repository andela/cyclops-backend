export default (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    user_uuid: DataTypes.UUID,
    room_uuid: DataTypes.UUID,
    dates: DataTypes.ARRAY(DataTypes.STRING),
    status: {
      type: DataTypes.STRING,
      defaultValue: 'open'
    }
  }, {});
  Booking.associate = (models) => {
    Booking.belongsTo(models.Room, {
      as: 'room',
      foreignKey: 'room_uuid',
      onDelete: 'CASCADE'
    });
    Booking.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_uuid',
      onDelete: 'CASCADE'
    });
  };
  return Booking;
};
