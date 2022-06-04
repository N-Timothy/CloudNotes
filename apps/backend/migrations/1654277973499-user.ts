import {Table, TableColumn} from 'typeorm'

import {addTimestamps} from '~/utils/migration'

import type {MigrationInterface, QueryRunner} from 'typeorm'

export class user1654277973499 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          }),
          // new TableColumn({
          //   name: 'username',
          //   type: 'varchar',
          //   length: '25',
          //   isNullable: false,
          //   isUnique: true,
          // }),
          new TableColumn({
            name: 'password',
            type: 'varchar',
            isNullable: false,
          }),
          new TableColumn({
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          }),
          new TableColumn({
            name: 'name',
            type: 'varchar',
            isNullable: false,
          }),
          new TableColumn({
            name: 'role',
            type: 'enum',
            enum: ['admin', 'user'],
            enumName: 'users_role_enum',
            default: "'user'",
          }),
          ...addTimestamps({
            deleted_at: true,
          }),
        ],
      }),
      true,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users', true)
  }
}
