export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    role_id: {
      type: DataTypes.UUID
    },
    role: {
      type: DataTypes.STRING
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    facebook_id: DataTypes.STRING,
    google_id: DataTypes.STRING,
    gender: DataTypes.STRING,
    image_url: DataTypes.STRING,
    date_of_birth: DataTypes.STRING,
    department: DataTypes.STRING,
    preferred_currency: DataTypes.STRING,
    preferred_language: DataTypes.STRING,
    residential_address: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {});
  User.associate = (models) => {
    User.belongsTo(models.Manager, {
      as: 'manager',
      foreignKey: 'manager_uuid'
    });
    User.hasMany(models.TripRequest, {
      as: 'trips',
      foreignKey: 'user_uuid',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Notification, {
      as: 'notifications',
      foreignKey: 'user_uuid',
      onDelete: 'CASCADE'
    });
    User.belongsTo(models.Role, {
      foreignKey: 'role_id'
    });
  };
  return User;
};
