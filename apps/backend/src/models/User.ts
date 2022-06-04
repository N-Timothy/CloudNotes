import 'reflect-metadata'
import {
  Entity,
  Column,
  Unique,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from 'typeorm'
import {Length, IsEmail} from 'class-validator'
import {Exclude} from 'class-transformer'
import argon2 from 'argon2'

import {ParanoidModel} from './base/ParanoidModel'

@Entity('users')
@Unique(['email'])
export class User extends ParanoidModel {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  @Length(2, 50)
  name!: string

  @Column()
  @Length(4, 30)
  @IsEmail()
  email!: string

  @Exclude()
  @Column()
  @Length(25, 100)
  password!: string

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password)
  }
}
