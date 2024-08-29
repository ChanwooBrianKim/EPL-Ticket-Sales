// import fs from 'fs';
// import path from 'path';
// import { Sequelize, DataTypes, Model, ModelStatic } from 'sequelize';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const env = process.env.NODE_ENV || 'development';
// import config from '../config/config.json' assert { type: 'json' };
// const dbConfig = config[env];

// const db: { [key: string]: ModelStatic<Model<any, any>> } = {};

// let sequelize: Sequelize;
// if (dbConfig.use_env_variable) {
//   sequelize = new Sequelize(process.env[dbConfig.use_env_variable] as string, dbConfig);
// } else {
//   sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
// }

// fs.readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== path.basename(__filename) &&
//       file.slice(-3) === '.ts' && // changed to '.ts' for TypeScript
//       file.indexOf('.test.ts') === -1
//     );
//   })
//   .forEach(async file => {
//     const { default: model } = await import(path.join(__dirname, file));
//     db[model.name] = model.init(sequelize, DataTypes);
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// export default db;
