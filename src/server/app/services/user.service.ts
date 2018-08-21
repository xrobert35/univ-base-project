import { Injectable, HttpStatus } from '@nestjs/common';
import { BaseService } from './base.service';
import { UserEntity } from '@repository/schema/User.entity';
import { UserMongoRepository } from '@repository/repositories/User.repository';
import { FunctionalException } from '@common/exception/functional.exception';

@Injectable()
export class UserService extends BaseService<UserEntity> {

  constructor(readonly userRepository: UserMongoRepository) {
    super(userRepository.getBaseRepository());
  }

  async create(user: UserEntity) {
    const existingContent = await this.userRepository.getBaseRepository().findOne({email : user.email });
    if (existingContent) {
      throw new FunctionalException('already_exist',
        `A User with the same email already exist :  ${existingContent.name}`, HttpStatus.CONFLICT);
    }
    return super.create(user);
  }
}
