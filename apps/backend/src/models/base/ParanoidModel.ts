import {DeletedAt} from 'sequelize-typescript'
import {z} from 'zod'

import {BaseModel, BaseModelValidation} from './BaseModel'

abstract class ParanoidModel extends BaseModel {
  @DeletedAt
  deletedAt!: Date | null
}

class ParanoidModelValidation {
  /**
   * Get current model validation rules
   */
  public static get rules() {
    return {
      deletedAt: z.date().nullable(),
    }
  }

  /**
   * Get current model validation rules schema
   */
  public static get rulesSchema() {
    return z.object(ParanoidModelValidation.rules)
  }

  /**
   * Get full model (with its parent) validation rules schema
   */
  public static get fullRulesSchema() {
    return BaseModelValidation.fullRulesSchema.merge(
      ParanoidModelValidation.rulesSchema,
    )
  }
}

export {ParanoidModel, ParanoidModelValidation}
