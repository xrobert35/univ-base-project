import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsDefined, IsDate, Allow, IsEmail, IsArray } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ObjectID } from 'mongodb';
import { User } from '@shared/interface/user.int';
import { Role } from '@shared/enum/role.enum';

export class UserDto implements User {

  @Allow()
  @Transform((id: string) => new ObjectID(id), { toClassOnly: true })
  @ApiModelProperty()
  _id?: ObjectID;

  @IsString()
  @IsDefined()
  @ApiModelProperty()
  name: string;

  @IsEmail()
  @IsDefined()
  @ApiModelProperty()
  email: string;

  @IsArray()
  @IsDefined()
  @ApiModelProperty()
  roles: Array<Role>;

  @Type(() => Date)
  @IsDate()
  @ApiModelProperty()
  createdOn?: Date;

  @Type(() => Date)
  @IsDate()
  @ApiModelProperty()
  updatedOn?: Date;
}
