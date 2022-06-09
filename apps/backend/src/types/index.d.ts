type UmzugMigrationParams = {
  Sequelize: typeof import('sequelize')
  queryInterface: import('sequelize').QueryInterface
}

type ApiRouterParams = {
  database: import('sequelize-typescript').Sequelize
}

export type {UmzugMigrationParams, ApiRouterParams}
