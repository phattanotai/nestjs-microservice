import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get('userProfile')
  getUserData(@Req() request): any {
    return {
      statusCode: 200,
      message: 'Ok',
      data: request.user,
    };
  }
}
