import { IMongoModel } from './mongo-base.schema';
import { Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class ProductEntity implements IMongoModel {

  @ObjectIdColumn()
  _id?: ObjectID;

  @PrimaryColumn()
  reference?: string;

  @Column()
  name: string;

  @Column()
  content: string;

  @Column()
  createdOn?: Date;

  @Column()
  updatedOn?: Date;
}
