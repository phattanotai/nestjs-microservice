import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/models/product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  getProductAll(): Promise<Product[]> {
    return this.productModel
      .find(
        {},
        {
          _id: 0,
          id: 1,
          title: 1,
          image: 1,
        },
      )
      .exec();
  }
  getProductById(id: number): Promise<Product> {
    return this.productModel
      .findOne(
        { id },
        {
          _id: 0,
          id: 1,
          title: 1,
          image: 1,
        },
      )
      .exec();
  }

  async createProduct(productData: any): Promise<Product> {
    return await new this.productModel(productData).save();
  }

  updateProduct(id: number, data: any) {
    return this.productModel.findOneAndUpdate({ id }, data, {
      projection: {
        _id: 0,
        id: 1,
        title: 1,
        image: 1,
      },
    });
  }

  deleteProduct(id: number) {
    return this.productModel.findOneAndDelete({ id });
  }
}
