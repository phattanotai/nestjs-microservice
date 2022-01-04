import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { Product } from 'src/product/models/product.entity';
import { ProductService } from '../service/product.service';
import { storage } from '../../helpers/upload.function';
import { uploadConfig } from '../../helpers/config/config';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { HasRoles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/user/models/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get('test')
  async test() {
    return 'test';
  }

  @UseGuards(JwtAuthGuard)
  @Post('files')
  @UseInterceptors(
    FilesInterceptor('files', 5, storage(uploadConfig.filesPath)),
  )
  @UseGuards(JwtAuthGuard)
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    const filesArr: string[] = [];
    for (let i of files) {
      filesArr.push(i.filename);
    }
    return { files: filesArr };
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'file1', maxCount: 1 },
        { name: 'file2', maxCount: 1 },
      ],
      storage(uploadConfig.filesPath),
    ),
  )
  upload(
    @UploadedFiles()
    files: {
      file1?: Express.Multer.File[];
      file2?: Express.Multer.File[];
    },
  ) {
    return {
      files: files.file1[0].filename,
      file2: files.file2[0].filename,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('file')
  @UseInterceptors(FileInterceptor('file', storage(uploadConfig.filesPath)))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      file: file,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('image')
  @UseInterceptors(FileInterceptor('image', storage(uploadConfig.imagesPath)))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return {
      file: file,
    };
  }

  @HasRoles(Role.ADMIN, Role.USER, Role.PREMIUM)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAll(@Req() request) {
    const data = await this.productService.getProductAll();
    if (data) {
      return {
        statusCode: 200,
        message: 'Ok',
        data,
      };
    } else {
      throw new HttpException('NO CONTENT', HttpStatus.NO_CONTENT);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: number) {
    const data = await this.productService.getProductById(id);
    if (data) {
      return {
        statusCode: 200,
        message: 'Ok',
        data,
      };
    } else {
      throw new HttpException('NO CONTENT', HttpStatus.NO_CONTENT);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body('title') title: string, @Body('image') image: string) {
    const data = await this.productService.createProduct({
      title,
      image,
    });
    if (data) {
      this.client.emit('create_product', data);
      return {
        statusCode: 200,
        message: 'Ok',
        data,
      };
    } else {
      throw new HttpException('NOT IMPLEMENTED', HttpStatus.NOT_IMPLEMENTED);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('image') image: string,
  ) {
    const updateStatus = await this.productService.updateProduct(id, {
      id,
      title,
      image,
    });
    if (updateStatus) {
      const data = await this.productService.getProductById(id);
      this.client.emit('update_product', data);
      throw new HttpException('Ok', HttpStatus.OK);
    } else {
      throw new HttpException('Not Modified', HttpStatus.NOT_MODIFIED);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    const deleteStatus = await this.productService.deleteProduct(id);
    if (deleteStatus) {
      const data = await this.productService.getProductById(id);
      this.client.emit('delete_product', id);
      throw new HttpException('Ok', HttpStatus.OK);
    } else {
      throw new HttpException('Not Delete', HttpStatus.NOT_IMPLEMENTED);
    }
  }
}
