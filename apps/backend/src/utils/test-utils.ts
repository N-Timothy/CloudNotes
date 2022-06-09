import {Sequelize} from 'sequelize-typescript'
import {Umzug, SequelizeStorage} from 'umzug'

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
