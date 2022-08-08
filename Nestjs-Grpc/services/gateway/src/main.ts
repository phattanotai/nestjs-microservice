import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as path from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const URL = 'localhost:50051';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: URL,
        package: 'gateway',
        protoPath: path.resolve(__dirname, '../../../proto/gateway.proto'),
        loader: {
          includeDirs: [path.resolve(__dirname, '../../..')],
        },
      },
    },
  );

  await app.listen();
  console.log(URL);
}
bootstrap();
