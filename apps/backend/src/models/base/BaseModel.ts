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
import {z} from 'zod'

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

  public serialize(opts?: ClassTransformOptions) {
    return JSON.stringify(instanceToPlain(this, opts))
  }
}

class BaseModelValidation {
  /**
   * Get current model validation rules
   */
  public static get rules() {
    return {
      id: z.string().uuid(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }
  }

  /**
   * Get current model validation rules schema
   */
  public static get rulesSchema() {
    return z.object(BaseModelValidation.rules)
  }

  /**
   * Get full model (with its parent) validation rules schema
   */
  public static get fullRulesSchema() {
    return BaseModelValidation.rulesSchema
  }
}

export {BaseModel, BaseModelValidation}
