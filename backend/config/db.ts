import { Sequelize } from 'sequelize';
import configFile from './config.json';

const env = process.env.NODE_ENV || 'development';
const config = configFile[env] as {
  database: string;
  username: string;
  password: string;
  [key: string]: any;
};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

export default sequelize;
