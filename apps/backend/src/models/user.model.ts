import {Entity, Column, Unique, PrimaryGeneratedColumn} from 'typeorm'
import {Length} from 'class-validator'
// import {Exclude} from 'class-transformer'

@Entity('users')
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({type: 'character varying'})
  //   @Column()
  @Length(4, 20)
  username!: string

  //   @Column()
  //   @Length(2, 50)
  //   name!: string

  //   @Column()
  //   @Length(4, 30)
  //   @IsEmail()
  //   email!: string

  //   @Exclude()
  //   @Column()
  //   @Length(25, 100)
  //   password!: string

  //   @Column({nullable: true})
  //   @IsOptional()
  //   @IsDate()
  //   lastLogin!: Date

  // @BeforeInsert()
  // async hashPassword() {
  //   this.password = await argon2.hash(this.password);
  // }
}
