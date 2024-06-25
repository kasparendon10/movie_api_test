const { sequelize } = require('../models');

module.exports = async () => {
  try {
    await sequelize.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing the database connection:', error);
  }
};
