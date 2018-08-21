import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '@repository/schema/product.entity';

@Injectable()
export class ProductMongoRepository {

  constructor(@InjectRepository(ProductEntity)
  private readonly productRepository: Repository<ProductEntity>) {
  }

  public getBaseRepository() {
    return this.productRepository;
  }
}
