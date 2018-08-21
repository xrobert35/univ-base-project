import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@repository/schema/user.entity';

@Injectable()
export class UserMongoRepository {

  constructor(@InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>) {
  }

  public getBaseRepository() {
    return this.userRepository;
  }
}
