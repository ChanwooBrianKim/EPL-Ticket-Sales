import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes, Dialect } from 'sequelize';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import configJson from '../config/config.json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const env = process.env.NODE_ENV || 'development';

interface Config {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect | undefined;
  use_env_variable?: string;
}

interface ConfigFile {
  [key: string]: Config; // This allows the object to be indexed by a string
}

const configFile: ConfigFile = {
  development: {
    username: "your_dev_username",
    password: "your_dev_password",
    database: "your_dev_database",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "your_test_username",
    password: "your_test_password",
    database: "your_test_database",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "your_prod_username",
    password: "your_prod_password",
    database: "your_prod_database",
    host: "your_production_host",
    dialect: "postgres",
  },
};

const config = configFile[env];
const db: any = {};

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]!, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== path.basename(__filename) &&
      file.slice(-3) === '.ts' &&
      file.indexOf('.test.ts') === -1
    );
  })
  .forEach(async (file) => {
    const { default: model } = await import(path.join(__dirname, file));
    db[model.name] = model.init(sequelize, DataTypes);
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
export default db;
