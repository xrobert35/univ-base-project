import { ApiModelProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { ObjectID } from 'mongodb';
import { IsString, IsDefined, IsDate, Allow } from 'class-validator';
import { Product } from '@shared/interface/product.int';

export class ProductDto implements Product {

  @Allow()
  @ApiModelProperty()
  @Transform((id: string) =>  new ObjectID(id), {toClassOnly : true})
  _id?: ObjectID;

  @IsString()
  @ApiModelProperty()
  reference?: string;

  @IsString()
  @IsDefined()
  @ApiModelProperty()
  name: string;

  @IsString()
  @ApiModelProperty()
  content: string;

  @ApiModelProperty()
  @Type(() => Date)
  @IsDate()
  createdOn?: Date;

  @ApiModelProperty()
  @Type(() => Date)
  @IsDate()
  updatedOn?: Date;
}
