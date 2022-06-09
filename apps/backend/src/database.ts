import path from 'path'

import {Sequelize} from 'sequelize-typescript'

import {env} from './env'

let sequelize: Sequelize

function setupDatabase() {
  if (!sequelize) {
    sequelize = new Sequelize(env.DATABASE_URL, {
      dialect: 'postgres',
      repositoryMode: true,
      models: [path.resolve(__dirname, 'models/**/*.ts')],
      logging: env.ENVIRONMENT === 'development',
    })
  }
  return sequelize
}

export {setupDatabase}
