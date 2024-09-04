import { Sequelize, Dialect } from 'sequelize';
import dotenv from 'dotenv';
import configFile from './config.json' assert { type: 'json' };

// Load environment variables from .env file
dotenv.config();

// Define the environment type (limited to the keys in config.json)
type Environment = 'development' | 'test' | 'production';

const env: Environment = (process.env.NODE_ENV as Environment) || 'development';

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
  development: Config;
  test: Config;
  production: Config;
}

const config: Config = (configFile as ConfigFile)[env];

// Initialize Sequelize with the config
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

export default sequelize;
