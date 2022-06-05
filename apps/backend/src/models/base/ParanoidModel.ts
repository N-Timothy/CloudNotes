import {DeletedAt} from 'sequelize-typescript'

import {BaseModel} from './BaseModel'

abstract class ParanoidModel extends BaseModel {
  @DeletedAt
  deletedAt!: Date | null
}

export {ParanoidModel}
