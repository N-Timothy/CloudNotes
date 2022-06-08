import {Sequelize} from 'sequelize-typescript'

import {env} from './env'

let sequelize: Sequelize

function setupDB() {
  if (!sequelize) {
    sequelize = new Sequelize(env.DATABASE_URL, {
      repositoryMode: true,
      models: [__dirname + '/models/**/*.ts'],
      logging: env.ENVIRONMENT === 'development',
    })
  }
}

export {sequelize, setupDB}
