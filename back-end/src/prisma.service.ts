/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/require-await */
import {
  INestApplication,
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { prisma } from '../libs/prisma.js';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  // Expõe o cliente para quem precisar injetar o PrismaService
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  readonly db = prisma;

  async onModuleInit() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    await prisma.$connect();
  }

  async onModuleDestroy() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    await prisma.$disconnect();
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', () => void app.close());
  }
}
