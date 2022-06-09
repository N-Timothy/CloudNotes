import 'reflect-metadata'

import fs from 'fs'
import path from 'path'

import {Sequelize} from 'sequelize-typescript'
import {Umzug, SequelizeStorage} from 'umzug'

import {sequelize, setupDB} from '~/db'

setupDB()

const umzug = new Umzug({
  migrations: {glob: 'database/migrations/*.ts'},
  context: {Sequelize, queryInterface: sequelize.getQueryInterface()},
  storage: new SequelizeStorage({sequelize}),
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
