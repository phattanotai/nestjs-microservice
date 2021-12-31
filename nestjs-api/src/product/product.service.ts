import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRespository: Repository<Product>,
  ) {}

  async getProductAll(): Promise<Product[]> {
    return this.productRespository.find();
  }

  async getProductById(id: number): Promise<Product> {
    return this.productRespository.findOne(id);
  }

  async createProduct(productData: any): Promise<Product> {
    return this.productRespository.save(productData);
  }

  async updateProduct(id: number, productData: Product): Promise<boolean> {
    const data = await this.productRespository.update(id, productData);

    if (data.affected) {
      return true;
    } else {
      return false;
    }
  }

  async deleteProduct(id: number): Promise<boolean> {
    const data = await this.productRespository.delete(id);

    if (data.affected) {
      return true;
    } else {
      return false;
    }
  }
}
