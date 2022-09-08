import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url:
            process.env.DATABASE_URL ||
            'postgres://ehrmlgmwydalqd:43f5b7112334a07b73791be6c9037e69f7368600b42d7fab4a7bcd86d8ea491c@ec2-3-208-79-113.compute-1.amazonaws.com:5432/db32i51q8v86qm',
        },
      },
    });
  }
}
