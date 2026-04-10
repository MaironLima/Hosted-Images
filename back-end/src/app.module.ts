import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
