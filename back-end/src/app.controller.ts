import {
  Controller,
  Get,
  HttpCode,
  Post,
  Delete,
  UploadedFile,
  UseInterceptors,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service.js';
import type { Image } from './generated/prisma/client.js';
import type { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('image')
  async getAllImage(): Promise<Image[]> {
    return await this.appService.getAllImage();
  }

  @Get('image/download/:id')
  async downloadFile(@Param('id') id: string, @Res() res: Response) {
    return this.appService.downloadFile(id, res);
  }

  @HttpCode(200)
  @Post('image/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return await this.appService.uploadAndSaveImage(file);
  }

  @Delete('image/:id')
  @HttpCode(204)
  async deleteImage(@Param('id') id: string) {
    await this.appService.deleteImage(id);
  }
}
