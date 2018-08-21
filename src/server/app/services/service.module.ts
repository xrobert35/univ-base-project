import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { ProductService } from './product.service';
import { UserService } from '@services/user.service';

const services = [
  ProductService,
  UserService
];

@Module({
  imports: [RepositoryModule],
  providers: [...services],
  exports : [...services, RepositoryModule],
})
export class ServiceModule {}
