import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { resolve } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SUMMATOR_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'summator',
          protoPath: resolve(__dirname, '../../../proto/summator.proto'),
          url: 'localhost:50052',
        },
      },
      {
        name: 'GATEWAY_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'gateway',
          protoPath: resolve(__dirname, '../../../proto/gateway.proto'),
          url: 'localhost:50051',
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
