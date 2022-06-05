import {
  BeforeBulkUpdate,
  BeforeCreate,
  BeforeUpdate,
  Column,
  Table,
} from 'sequelize-typescript'
import {Length, IsEmail} from 'class-validator'
import {Exclude} from 'class-transformer'
import argon2 from 'argon2'

import {ParanoidModel} from './base/ParanoidModel'

@Table
class User extends ParanoidModel {
  @Column
  @Length(2, 50)
  name!: string

  @Column
  @Length(4, 30)
  @IsEmail()
  email!: string

  @Column
  @Exclude()
  @Length(25, 100)
  password!: string

  @BeforeCreate
  static async makeUpperCase(instance: User) {
    console.log(instance)
    instance.password = await argon2.hash(instance.password)
  }

  // @BeforeBulkUpdate
  @BeforeUpdate
  static async hashUpdatedPassword(instance: User) {
    instance.password = await argon2.hash(instance.password)
  }
}

export {User}
