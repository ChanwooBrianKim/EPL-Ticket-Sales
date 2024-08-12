const fs = require('fs'); // Importing the fs module
const path = require('path'); // Importing the path module
const Sequelize = require('sequelize'); // Importing the Sequelize module
const process = require('process'); // Importing the process module
const basename = path.basename(__filename); // Getting the base name of the current file
const env = process.env.NODE_ENV || 'development'; // Getting the current environment
const config = require(__dirname + '/../config/config.json')[env]; // Getting the configuration for the current environment
const db = {}; // Creating an empty object to store the models

// Check if the configuration uses an environment variable
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Read all the files in the current directory
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Associate the models
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Add the sequelize instance to the db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
