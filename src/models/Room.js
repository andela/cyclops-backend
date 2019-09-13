export default (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING
    },
    cost: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {});
  Room.associate = () => {
  };
  return Room;
};
