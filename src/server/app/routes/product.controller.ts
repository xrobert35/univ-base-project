import { Controller, Post, Put, Body, Delete, HttpStatus, HttpCode, Param, Get, NotFoundException, UsePipes } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { CustomValidationPipe } from '@common/validations/custom-validation.pipe';
import { ProductService } from '@services/product.service';
import { ProductDto } from '../dto/content.dto';
import { Authenticate } from '../security/guards/authenticate.decator';

@ApiUseTags('product')
@Controller('product')
@Authenticate()
export class ProductController {

  constructor(private readonly productService: ProductService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new CustomValidationPipe())
  public async create(@Body() productDto: ProductDto) {
    const newContent = await this.productService.create(productDto);
    return newContent;
  }

  @Put(':reference')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new CustomValidationPipe())
  public async update(@Param('reference') reference: string, @Body() productDto: ProductDto) {
    const pageUpdated = await this.productService.update(reference, productDto);
    return pageUpdated;
  }

  @Delete(':reference')
  @HttpCode(HttpStatus.OK)
  public async delete(@Param('reference') reference: string) {
    const deleteResult = await this.productService.delete(reference);
    if (!deleteResult) {
      throw new NotFoundException(`No product with reference ${reference} found`);
    }
  }

  @Get('list')
  @HttpCode(HttpStatus.OK)
  public async list(): Promise<Array<ProductDto>> {
    const contents = await this.productService.listAll();
    return contents;
  }

  @Get(':reference')
  @HttpCode(HttpStatus.OK)
  public async get(@Param('reference') reference: string): Promise<ProductDto> {
    const content = await this.productService.findByReference(reference);
    if (content) {
      return content;
    } else {
      throw new NotFoundException(`No product with reference ${reference} found`);
    }
  }
}
