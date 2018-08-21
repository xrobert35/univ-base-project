import { IMongoModel } from './mongo-base.schema';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '@shared/enum/role.enum';

@Entity()
export class UserEntity implements IMongoModel {

  @PrimaryGeneratedColumn()
  _id;

  @Column()
  email: string;

  @Column()
  roles: Array<Role>;

  @Column()
  name: string;

  @Column()
  lastLoginAttempt?: Date;

  @Column()
  lastLoginSuccessful?: Date;

  @Column()
  createdOn?: Date;

  @Column()
  updatedOn?: Date;
}
