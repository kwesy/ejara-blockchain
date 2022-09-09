import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
// import { AxiosResponse } from 'Axios';
import { lastValueFrom, map } from 'rxjs';
import { BlockHash, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  async getBlocks(): Promise<any> {
    const res = lastValueFrom(
      this.httpService
        .get('https://tez.nodes.ejaraapis.xyz/chains/main/blocks/')
        .pipe(map((res) => res.data)),
    );
    return await res;
  }

  async getBlockByHash(blockhash: string): Promise<any> {
    const res = lastValueFrom(
      this.httpService
        .get('https://tez.nodes.ejaraapis.xyz/chains/main/blocks/' + blockhash)
        .pipe(map((res) => res.data)),
    );
    return await res;
  }

  findMedian(inputArray) {
    const sortedArr = inputArray.slice().sort((a, b) => a - b);
    const inputLength = inputArray.length;
    const middleIndex = Math.floor(inputLength / 2);
    const oddLength = inputLength % 2 != 0;
    let median;
    if (oddLength) {
      // if array length is odd -> return element at middleIndex
      median = sortedArr[middleIndex];
    } else {
      median = (sortedArr[middleIndex] + sortedArr[middleIndex - 1]) / 2;
    }
    return median;
  }

  median(v: number[]): number {
    // console.log(v);
    if (v.length == 0) {
      return 0;
    }

    const sorted = v.sort((a, b) => a - b);
    const half = Math.floor(sorted.length) / 2;

    if (sorted.length % 2) {
      console.log(sorted.length % 2);
      return sorted[half];
    }

    console.log('Here');

    return (sorted[half - 1] + sorted[half]) / 2.0;
  }

  async getBlockTransactionMetrices(block_number: number): Promise<any> {
    const blockHashs = await this.getBlocks();
    // console.log(blockHashs);
    console.log(block_number);
    const block = await this.getBlockByHash(blockHashs[block_number][0]);
    // console.log(block);
    const transactions = [];
    block.operations.forEach((e) => {
      e.forEach((element) => {
        transactions.push(element);
      });
    });
    const transac = transactions.filter(
      (f) => f.contents[0].kind == 'transaction',
    );

    const transac_fees: number[] = transac.map((t) =>
      parseInt(t.contents[0].fee),
    );
    const min = Math.min(...transac_fees);
    // console.log(min);
    const max = Math.max(...transac_fees);
    // console.log(min);
    const average =
      transac_fees.reduce((a, b) => a + b, 0) / transac_fees.length;
    const median = this.findMedian(transac_fees);
    console.log(median);

    return { min, max, average, median };
  }

  async cacheData() {
    const hash = await this.getBlocks();
    this.prisma.blockHash.create({
      data: {
        hash: hash,
      },
    });
  }
}
