import {
  CreatedAt,
  UpdatedAt,
  Column,
  PrimaryKey,
  IsUUID,
  DataType,
  Model,
  Default,
} from 'sequelize-typescript'
import {instanceToPlain} from 'class-transformer'

import type {ClassTransformOptions} from 'class-transformer'

class BaseModel extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string

  @CreatedAt
  createdAt!: Date

  @UpdatedAt
  updatedAt!: Date

  serialize(opts?: ClassTransformOptions) {
    return JSON.stringify(instanceToPlain(this, opts))
  }
}

export {BaseModel}
