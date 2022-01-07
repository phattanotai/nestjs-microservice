import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod, ClientGrpc } from '@nestjs/microservices';
import {
  SummatorServiceClient,
  GatewayServiceClient,
} from './interfaces/grpc.interface';

@Controller()
export class AppController implements OnModuleInit {
  private summatorService: SummatorServiceClient;
  private gatewayService: GatewayServiceClient;

  constructor(
    private readonly appService: AppService,
    @Inject('SUMMATOR_PACKAGE') private clientSummator: ClientGrpc,
    @Inject('GATEWAY_PACKAGE') private clientGateway: ClientGrpc,
  ) {}

  onModuleInit() {
    console.log(1);
    this.summatorService =
      this.clientSummator.getService<SummatorServiceClient>('SummatorService');

    this.gatewayService =
      this.clientGateway.getService<GatewayServiceClient>('GatewayService');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('summator')
  getSummator(@Body('a') a: number, @Body('b') b: number) {
    console.log(a, b);
    return this.summatorService.sum({ numbers: [a, b] }).toPromise();
    // return a + b;
  }

  @Post('gateway')
  getGateway(@Body('a') a: number, @Body('b') b: number) {
    console.log(a, b);
    return this.gatewayService.add({ a, b }).toPromise();
    // return a + b;
  }
}
