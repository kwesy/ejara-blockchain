import { Module } from '@nestjs/common';
import { TransactionModule } from './transaction/transaction.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [TransactionModule, TransactionModule, PrismaModule],
})
export class AppModule {}
