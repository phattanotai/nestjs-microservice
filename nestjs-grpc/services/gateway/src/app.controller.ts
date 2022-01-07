import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { GrpcMethod, ClientGrpc } from '@nestjs/microservices';
import { SummatorServiceClient } from './interfaces/summator.interface';

interface AddRequest {
  a: number;
  b: number;
}

@Controller()
export class AppController implements OnModuleInit {
  private summatorService: SummatorServiceClient;

  constructor(@Inject('SUMMATOR_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    console.log(1);
    this.summatorService =
      this.client.getService<SummatorServiceClient>('SummatorService');
  }

  @GrpcMethod('GatewayService', 'Add')
  add(body: AddRequest) {
    console.log(2);
    return this.summatorService.sum({ numbers: [body.a, body.b] }).toPromise();
  }
}
