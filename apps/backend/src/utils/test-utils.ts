import {Sequelize} from 'sequelize-typescript'
import {Umzug, SequelizeStorage} from 'umzug'

// const database = new Sequelize({
//   dialect: 'postgres',
//   models: [path.resolve(__dirname, '../models/**/*.ts')],
//   repositoryMode: true,
//   logging: false,
// })

function setupMigration(database: Sequelize) {
  let umzug = new Umzug({
    migrations: {glob: 'database/migrations/*.ts'},
    context: {
      Sequelize,
      queryInterface: database.getQueryInterface(),
    },
    storage: new SequelizeStorage({sequelize: database}),
    logger: undefined,
  })

  return umzug
}

export {setupMigration}
