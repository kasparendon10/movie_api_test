const { sequelize } = require('../models');

module.exports = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
    process.exit(1); // salir del error
  }
};

