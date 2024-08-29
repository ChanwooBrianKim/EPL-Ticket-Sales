import { Sequelize, Dialect } from 'sequelize';
import configFile from './config.json' assert { type: 'json' };

const env = process.env.NODE_ENV || 'development';

// Define the type for the config object
interface Config {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
  [key: string]: any;
}

interface ConfigFile {
  [key: string]: Config;
}

const config: Config = (configFile as ConfigFile)[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

export default sequelize;
