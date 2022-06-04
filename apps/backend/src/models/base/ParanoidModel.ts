import {DeleteDateColumn} from 'typeorm'

import {BaseModel} from './BaseModel'

abstract class ParanoidModel extends BaseModel {
  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt!: Date | null
}

export {ParanoidModel}
