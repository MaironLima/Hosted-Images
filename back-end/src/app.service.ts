/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BadRequestException, Injectable } from '@nestjs/common';
import { cloudinary, CLOUDINARY_BASE_URL } from './config/cloudinary.config.js';
import {
  type UploadApiErrorResponse,
  type UploadApiResponse,
} from 'cloudinary';
import { prisma } from './prisma.js';
import type { Image } from './generated/prisma/client.js';
import axios from 'axios';
import type { Response } from 'express';

@Injectable()
export class AppService {
  ////////////////////////////////////////////////////////////////////
  getHello(): string {
    return 'Ping';
  }
  ////////////////////////////////////////////////////////////////////

  async getAllImage(): Promise<Image[]> {
    return prisma.image.findMany();
  }
  ////////////////////////////////////////////////////////////////////
  async downloadFile(id: string, res: Response) {
    const file = await prisma.image.findUnique({
      where: { id },
    });

    if (!file?.url) {
      throw new Error('Arquivo não encontrado');
    }

    const fileUrl = file.url.startsWith('http')
      ? file.url
      : `${CLOUDINARY_BASE_URL}/${file.url}`;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const response = await axios.get(fileUrl, {
      responseType: 'stream',
    });

    res.set({
      'Content-Type': response.headers['content-type'],
      'Content-Disposition': `attachment; filename="${file.name}"`,
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    response.data.pipe(res);
  }
  ////////////////////////////////////////////////////////////////////
  async uploadAndSaveImage(file: Express.Multer.File): Promise<Image> {
    if (!file) {
      throw new BadRequestException('Arquivo não enviado');
    }

    const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];

    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('Apenas PNG, JPEG e PDF são permitidos');
    }
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      throw new BadRequestException('Tamanho máximo: 5MB');
    }

    const uploadResult: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        cloudinary.uploader
          .upload_stream(
            {
              folder: 'posts',
              resource_type: 'auto',
            },
            (
              error: UploadApiErrorResponse | undefined,
              result: UploadApiResponse | undefined,
            ) => {
              if (error) {
                reject(new Error(error.message));
                return;
              }
              if (!result) {
                reject(new Error('Erro ao enviar arquivo'));
                return;
              }
              resolve(result);
            },
          )
          .end(file.buffer);
      },
    );

    const sizeMB = Number((file.size / (1024 * 1024)).toFixed(5));

    return prisma.image.create({
      data: {
        name: file.originalname,
        url: uploadResult.secure_url,
        type: file.mimetype,
        size: sizeMB,
      },
    });
  }
  ////////////////////////////////////////////////////////////////////
  async deleteImage(id: string) {
    const file = await prisma.image.findUnique({ where: { id } });
    if (!file) throw new BadRequestException('Imagem não encontrada');

    try {
      const match = file.url.match(/\/upload\/(?:v\d+\/)?(.+)\.[^.]+$/);
      if (match && match[1]) {
        const publicId = match[1];
        await cloudinary.uploader.destroy(publicId);
      }
    } catch (error) {
      console.error('Erro ao deletar do Cloudinary', error);
    }

    await prisma.image.delete({ where: { id } });
  }
  ////////////////////////////////////////////////////////////////////
}
