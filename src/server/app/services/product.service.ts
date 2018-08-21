import { Injectable, HttpStatus } from '@nestjs/common';
import { BaseService } from './base.service';
import * as shortid from 'shortid';
import { ProductEntity } from '@repository/schema/product.entity';
import { ProductMongoRepository } from '@repository/repositories/product.repository';
import { FunctionalException } from '@common/exception/functional.exception';

@Injectable()
export class ProductService extends BaseService<ProductEntity> {

  constructor(readonly productRepository: ProductMongoRepository) {
    super(productRepository.getBaseRepository());
  }

  async create(product: ProductEntity) {
    const existingProduct = await this.productRepository.getBaseRepository().findOne({name : product.name });
    if (existingProduct) {
      throw new FunctionalException('already_exist',
        `A product with the same name already exist :  ${existingProduct.name}`, HttpStatus.CONFLICT);
    }
    product.reference = shortid.generate();
    return super.create(product);
  }
}
