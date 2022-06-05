import {addTimestamps} from '~/utils/migration'

import type {QueryInterface} from 'sequelize'

type Sequelize = typeof import('sequelize')

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
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
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('Users')
  },
}
