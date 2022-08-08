import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUser } from '../models/class/CreateUser.class';
import { LoginUser } from '../models/class/LoginUser.class';
import { UserI } from '../models/user.interface';
import { UserService } from '../service/user.service';
import { Role } from '../models/role.enum';
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() createdUserDto: CreateUser): Observable<UserI> {
    return this.userService.create(createdUserDto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() loginUserDto: LoginUser): Observable<Object> {
    return this.userService.login(loginUserDto).pipe(
      map((data: any) => {
        return {
          accessToken: data.jwt,
          tokenType: 'JWT',
          expiresIn: 10000,
          userData: data.user,
        };
      }),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() createdUserDto: CreateUser) {
    return this.userService.update(id, createdUserDto).pipe(
      map((updateStatus: any) => {
        console.log(updateStatus);
        return '';
      }),
    );
    // if (updateStatus) {
    //   const data = await this.userService.getProductById(id);

    //   throw new HttpException('Ok', HttpStatus.OK);
    // } else {
    //   throw new HttpException('Not Modified', HttpStatus.NOT_MODIFIED);
    // }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() request): Observable<UserI[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('userRole')
  getRole() {
    return Role;
  }
}
