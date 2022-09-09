import { Controller, Get, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('fees')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get(':block_number')
  get(@Param() p): any {
    if (p.block_number == 'latest') {
      // console.log(p);
      return this.transactionService.getBlockTransactionMetrices(0);
    } else {
      try {
        if (parseInt(p.block_number)) {
          const block_number = parseInt(p.block_number);
          return this.transactionService.getBlockTransactionMetrices(
            block_number,
          );
        } else return { 'err msg': 'validation failed' };
      } catch (error) {
        return { 'err msg': 'validation failed' };
      }
    }
  }
}
