const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('DB connected');

    // Sincronizar la base de datos solo si estamos en un entorno de desarrollo o pruebas
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
      console.log('Database & tables synced!');
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = { startServer };



