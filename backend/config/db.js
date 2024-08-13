import { Sequelize } from 'sequelize';
import configFile from './config.json' assert { type: 'json' };

const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

export default sequelize;
