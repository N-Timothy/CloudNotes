/* eslint-disable @typescript-eslint/no-unused-vars */

import {addTimestamps} from '~/utils/migration'

import type {MigrationFn} from 'umzug'
import type {UmzugMigrationParams} from '~/types'

const up: MigrationFn<UmzugMigrationParams> = async ({context}) => {
  let {Sequelize, queryInterface} = context
  await queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.DataTypes.UUID,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.ENUM,
      values: ['admin', 'user'],
      defaultValue: 'user',
    },
    ...addTimestamps({deletedAt: true}),
  })
}

const down: MigrationFn<UmzugMigrationParams> = async ({context}) => {
  await context.queryInterface.dropTable('Users')
}

export {up, down}
