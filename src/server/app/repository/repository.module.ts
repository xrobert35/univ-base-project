import { Module } from '@nestjs/common';
import { UserMongoRepository } from '@repository/repositories/User.repository';
import { ProductMongoRepository } from './repositories/product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '@repository/schema/product.entity';
import { UserEntity } from '@repository/schema/user.entity';

const repositories = [
  UserMongoRepository,
  ProductMongoRepository
];

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, UserEntity])],
  controllers: [],
  providers: [...repositories],
  exports : [...repositories],
})
export class RepositoryModule {
}
