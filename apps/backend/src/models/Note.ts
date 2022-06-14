import {Column, Table} from 'sequelize-typescript'
import {Expose} from 'class-transformer'
import {z} from 'zod'

import {
  ParanoidModel,
  ParanoidModelValidation,
} from './base/ParanoidModel'

@Table({paranoid: true})
class Note extends ParanoidModel {
  @Expose()
  @Column
  title!: string

  @Expose()
  @Column
  content!: string

  @Expose()
  @Column
  user_id!: string
}

class NoteValidation {
  /**
   * Get current model validation rules
   */
  public static get rules() {
    return {
      title: z.string().min(2).max(30),
      content: z.string(),
      user_id: z.string(),
    }
  }

  /**
   * Get current model validation rules schema
   */
  public static get rulesSchema() {
    return z.object(NoteValidation.rules)
  }

  /**
   * Get full model (with its parent) validation rules schema
   */
  public static get fullRulesSchema() {
    return ParanoidModelValidation.fullRulesSchema.merge(
      NoteValidation.rulesSchema,
    )
  }
}

export {Note, NoteValidation}
