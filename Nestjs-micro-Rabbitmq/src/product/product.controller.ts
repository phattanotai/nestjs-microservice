import { HttpService } from '@nestjs/axios';
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
import { EventPattern } from '@nestjs/microservices';
import e from 'express';
import { Product } from 'src/models/product.model';
import { ProductService } from './product.service';
import { AxiosResponse } from 'axios';
import { firstValueFrom, map, Observable } from 'rxjs';

import { ResponseType } from '../types/response.type';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private httpService: HttpService,
  ) {}

  @Get('http')
  async getHttp(@Param('id') id: number) {
    try {
      const users: AxiosResponse = await firstValueFrom(
        this.httpService.get('http://localhost:5000/api/product'),
        // .pipe(map((response) => response.data)),
      );
      console.log(users);
      if (users.data) {
        return users.data;
      } else {
        return users.data;
      }
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

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

  @EventPattern('create_product')
  async create(body: Product) {
    console.log(body);
    await this.productService.createProduct(body);
  }

  @EventPattern('update_product')
  async update(body: Product) {
    console.log(body);
    await this.productService.updateProduct(body.id, body);
  }

  @EventPattern('delete_product')
  async delete(id: number) {
    console.log(id);
    await this.productService.deleteProduct(id);
  }
}
