
export default (sequelize, DataTypes) => {
  const AccommodationFacility = sequelize.define('AccommodationFacility', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    user_uuid: {
      allowNull: false,
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'uuid'
      }
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    image_url: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    },
    services: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    },
    amenities: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    },
    location: {
      type: DataTypes.STRING
    },
    is_approved: {
      type: DataTypes.BOOLEAN
    }
  }, {});
  AccommodationFacility.associate = (models) => {
    AccommodationFacility.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_uuid',
      onDelete: 'CASCADE'
    });
    AccommodationFacility.hasMany(models.Room, {
      as: 'rooms',
      foreignKey: 'accommodation_uuid',
      onDelete: 'CASCADE'
    });
  };
  return AccommodationFacility;
};
