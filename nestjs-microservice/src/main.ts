import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  NestMicroservice,
  Transport,
} from '@nestjs/microservices';
import { AppModule } from './app.module';

const host = 'localhost:5672';
const credential = 'nestjsUser:nestjsPassword';
const rabbitMqUrl = `amqp://${credential}@${host}`;

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [rabbitMqUrl],
        queue: 'nestjs_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  await app.listen();

  // const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api');
  // app.enableCors({
  //   origin: '*',
  // });
  // await app.listen(4000);
}
bootstrap();
