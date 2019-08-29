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
    office_id: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    image_url: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    department: DataTypes.STRING,
    preferred_currency: DataTypes.STRING,
    preferred_language: DataTypes.STRING,
    residential_address: DataTypes.STRING
  }, {});
  User.associate = () => {
    // associations can be defined here
  };
  return User;
};
