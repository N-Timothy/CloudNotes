import {
  BeforeCreate,
  BeforeUpdate,
  Column,
  Table,
} from 'sequelize-typescript'
import {Expose} from 'class-transformer'
import argon2 from 'argon2'
import {z} from 'zod'

import {
  ParanoidModel,
  ParanoidModelValidation,
} from './base/ParanoidModel'

@Table
class User extends ParanoidModel {
  @Expose()
  @Column
  name!: string

  @Expose()
  @Column
  email!: string

  @Column
  password!: string

  @BeforeCreate
  @BeforeUpdate
  public static async hashPassword(instance: User) {
    instance.password = await argon2.hash(instance.password)
  }
}

class UserValidation {
  /**
   * Get current model validation rules
   */
  public static get rules() {
    return {
      password: z.string().regex(/^[a-zA-Z0-9]{3,30}$/),
      password_confirmation: z.string(),
      email: z.string().email(),
      name: z.string().min(2).max(50),
    }
  }

  /**
   * Get current model validation rules schema
   */
  public static get rulesSchema() {
    return z.object(UserValidation.rules)
  }

  /**
   * Get full model (with its parent) validation rules schema
   */
  public static get fullRulesSchema() {
    return ParanoidModelValidation.fullRulesSchema.merge(
      UserValidation.rulesSchema,
    )
  }
}

export {User, UserValidation}
