import Sequelize from 'sequelize';
import config from '../config/sequelize.config';

// Models
import User from './user';

const sequelize = new Sequelize(config.url, config);

const models = {
  User: User.init(sequelize, Sequelize)
};

Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate(models));

const db = {
  ...models,
  sequelize
}

export default db;
