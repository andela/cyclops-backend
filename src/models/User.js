<<<<<<< HEAD
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
=======
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
>>>>>>> ft(user): Create user signup feature
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
<<<<<<< HEAD
      defaultValue: DataTypes.UUIDV4,
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
=======
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter name'
      }
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter first name'
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter last name'
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your email address'
      },
      unique: {
        args: true,
        msg: 'Email already exists'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address'
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter a password'
      },
      validate: {
        isNotShort: (value) => {
          if (value.length < 6) {
            throw new Error('Password should be at least 8 characters');
          }
        },
      },
    },
    role: DataTypes.ENUM(
      'super_admin',
      'travel_admin',
      'travel_team_manager',
      'manager',
      'employer',
      'supplier'
    ),
    is_verify: {
      type: DataTypes.BOOLEAN,
      defaulValue: false
    },
    manager_id: DataTypes.UUIDV4,
    office_id: DataTypes.INTEGER,
    gender: DataTypes.ENUM('male', 'female'),
    date_of_birth: DataTypes.STRING,
    department: DataTypes.STRING,
    preferred_language: DataTypes.STRING,
    preferred_currency: DataTypes.STRING,
    residential_address: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });
>>>>>>> ft(user): Create user signup feature
  User.associate = () => {
    // associations can be defined here
  };
  return User;
};
