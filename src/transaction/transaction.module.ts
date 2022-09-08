import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [HttpModule, PrismaModule],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
