/* eslint-disable @typescript-eslint/no-unused-vars */

import type {MigrationFn} from 'umzug'
import type {UmzugMigrationParams} from '~/types'

const up: MigrationFn<UmzugMigrationParams> = async ({context}) => {
  //   await context.queryInterface.createTable()
}

const down: MigrationFn<UmzugMigrationParams> = async ({context}) => {
  //   await context.queryInterface.createTable()
}

export {up, down}
