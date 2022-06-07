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
import {Exclude, Expose, instanceToPlain} from 'class-transformer'
import {z} from 'zod'

import type {ClassTransformOptions} from 'class-transformer'

@Exclude()
class BaseModel extends Model {
  @Expose()
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string

  @Expose()
  @CreatedAt
  createdAt!: Date

  @Expose()
  @UpdatedAt
  updatedAt!: Date

  public serialize(opts?: ClassTransformOptions) {
    return instanceToPlain(this, {
      ...opts,
      excludeExtraneousValues: true,
      strategy: 'excludeAll',
    })
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
