export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('employee', 'super_admin', 'travel_admin', 'travel_team_manager', 'manager', 'supplier'),
      defaultValue: 'manager'
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    facebook_id: DataTypes.STRING,
    google_id: DataTypes.STRING,
    manager_id: DataTypes.INTEGER,
    office_uuid: {
      type: DataTypes.UUID,
      references: {
        model: 'OfficeLocation',
        key: 'uuid',
        as: 'office',
      }
    },
    gender: DataTypes.STRING,
    image_url: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    department: DataTypes.STRING,
    preferred_currency: DataTypes.STRING,
    preferred_language: DataTypes.STRING,
    residential_address: DataTypes.STRING
  }, {});
  User.associate = (models) => {
    // associations can be defined here
    User.belongsTo(models.OfficeLocation, {
      foreignKey: 'uuid',
      as: 'office',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.TripRequest, {
      foreignKey: 'user_uuid',
      as: 'trips',
      onDelete: 'CASCADE'
    });
  };
  return User;
};
