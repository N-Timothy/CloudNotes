import 'reflect-metadata'

import fs from 'fs'
import path from 'path'

import {Sequelize} from 'sequelize-typescript'
import {Umzug, SequelizeStorage} from 'umzug'

import {setupDatabase} from '~/database'

let database = setupDatabase()

const umzug = new Umzug({
  migrations: {glob: 'database/migrations/*.ts'},
  context: {Sequelize, queryInterface: database.getQueryInterface()},
  storage: new SequelizeStorage({sequelize: database}),
  logger: undefined,
  create: {
    folder: path.resolve('database', 'migrations'),
    template: filepath => [
      [
        filepath,
        fs.readFileSync('database/migration.template.ts').toString(),
      ],
    ],
  },
})

umzug.runAsCLI()
