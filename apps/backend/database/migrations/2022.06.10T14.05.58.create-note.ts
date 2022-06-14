/* eslint-disable @typescript-eslint/no-unused-vars */
import {addTimestamps} from '~/utils/migration'

import type {MigrationFn} from 'umzug'
import type {UmzugMigrationParams} from '~/types'

const up: MigrationFn<UmzugMigrationParams> = async ({context}) => {
  let {Sequelize, queryInterface} = context
  await queryInterface.createTable('Notes', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.DataTypes.UUID,
    },
    title: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
    user_id: {
      type: Sequelize.UUID,
      references: {model: 'Users', key: 'id'},
    },
    ...addTimestamps({deletedAt: true}),
  })
}

const down: MigrationFn<UmzugMigrationParams> = async ({context}) => {
  await context.queryInterface.dropTable('Notes')
}

export {up, down}
