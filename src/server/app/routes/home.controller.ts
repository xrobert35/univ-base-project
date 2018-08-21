import { ApiUseTags } from '@nestjs/swagger';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Authenticate } from '../security/guards/authenticate.decator';
import { UserDto } from '../dto/user.dto';
import { UserService } from '@services/user.service';
import { User } from '@common/decorators/user.decorator';

@ApiUseTags('home')
@Controller('/')
export class HomeController {

  constructor(private readonly userService: UserService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  public get() {
    return 'Hello world !';
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Authenticate()
  public me(@User() user: UserDto) {
    return this.userService.findOne({ email: user.email });
  }
}
