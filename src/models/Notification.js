export default (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    message: DataTypes.STRING,
    status: DataTypes.STRING,
    notification_type: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {});
  Notification.associate = () => {
  };
  return Notification;
};
