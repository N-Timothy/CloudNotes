import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm'

abstract class BaseModel {
  @PrimaryGeneratedColumn()
  id!: number

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt!: Date

  @BeforeInsert()
  createdDate() {
    this.createdAt = new Date()
  }

  @BeforeUpdate()
  updateDate() {
    this.updatedAt = new Date()
  }
}

export {BaseModel}
