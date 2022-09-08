import { Controller, Get, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('fees')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get(':block_number')
  get(@Param() p): any {
    if (p.block_number == 'latest') {
      console.log(p);
      return this.transactionService.getBlockTransactionMetrices(0);
    } else
      return this.transactionService.getBlockTransactionMetrices(
        p.block_number,
      );
  }
}
