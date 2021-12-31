import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import e from 'express';
import { Product } from 'src/entities/product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll() {
    const data = await this.productService.getProductAll();

    if (data) {
      return {
        statusCode: 200,
        message: 'Ok',
        data,
      };
    } else {
      throw new HttpException('NO CONTENT', HttpStatus.NO_CONTENT);
    }
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    const data = await this.productService.getProductById(id);

    if (data) {
      return {
        statusCode: 200,
        message: 'Ok',
        data,
      };
    } else {
      throw new HttpException('NO CONTENT', HttpStatus.NO_CONTENT);
    }
  }

  @Post()
  async create(@Body('title') title: string, @Body('image') image: string) {
    const data = await this.productService.createProduct({
      title,
      image,
    });

    if (data) {
      return {
        statusCode: 200,
        message: 'Ok',
        data,
      };
    } else {
      throw new HttpException('NOT IMPLEMENTED', HttpStatus.NOT_IMPLEMENTED);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('image') image: string,
  ) {
    const updateStatus = await this.productService.updateProduct(id, {
      id,
      title,
      image,
    });

    if (!updateStatus) {
      throw new HttpException('Not Modified', HttpStatus.NOT_MODIFIED);
    } else {
      throw new HttpException('Ok', HttpStatus.OK);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const deleteStatus = await this.productService.deleteProduct(id);
    if (!deleteStatus) {
      throw new HttpException('Not Delete', HttpStatus.NOT_IMPLEMENTED);
    } else {
      throw new HttpException('Ok', HttpStatus.OK);
    }
  }
}
