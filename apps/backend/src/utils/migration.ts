// import {TableColumn} from 'typeorm'
import Sequelize from 'sequelize'

import type {
  CreationAttributes,
  Model,
  ModelAttributes,
} from 'sequelize'

interface AddTimestampsOptions {
  deletedAt: boolean
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
function addTimestamps<
  M extends Model = Model,
  Attributes = ModelAttributes<M, CreationAttributes<M>>,
>(
  options: AddTimestampsOptions = {
    deletedAt: true,
  },
): Attributes {
  let {deletedAt} = options

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let columns: any = {
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }

  if (deletedAt) {
    columns = {
      ...columns,
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    }
  }

  return columns as Attributes
}

export {addTimestamps}
