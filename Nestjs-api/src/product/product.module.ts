import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/models/product.entity';

import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';

const host = 'localhost:5672';
const credential = 'nestjsUser:nestjsPassword';
const rabbitMqUrl = `amqp://${credential}@${host}`;

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [rabbitMqUrl],
          queue: 'nestjs_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
