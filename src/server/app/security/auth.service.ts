import { Injectable } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '@services/user.service';

@Injectable()
export class AuthService {

  constructor(private readonly jwtStrategy: JwtStrategy, private userService: UserService) { }

  public async authenticate(req, next) {
    const jwt: any = this.jwtStrategy;
    jwt.success = async(authUser) => {
      req.user = await this.userService.findOne({ email: authUser.email }) || authUser;
      next();
    };
    jwt.fail = () => next();
    jwt.error = () => next();

    await jwt.authenticate(req, { session: false });
    return req.user;
  }
}
