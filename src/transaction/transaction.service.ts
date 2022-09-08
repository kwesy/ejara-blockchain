import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
// import { AxiosResponse } from 'Axios';
import { lastValueFrom, map, Observable } from 'rxjs';
import { BlockHash, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  async getBlocks(): Promise<Observable<JSON>> {
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
    // const hash = await this.getBlocks();
    this.prisma.blockHash.create({
      data: {
        hash: [
          ['BLgbHqFJF3oUyU8vbL8UaFN9zU8N8uBdi5HfHyzNkCFZkpKGgGG'],
          ['BKtVqrLoXG9uTS5mBjyy1eEh8xKSBkkrN7keASE3JwEyT8RyMjJ'],
          ['BKwV9LPAM5kp6ht12kt2vLfEo79h29igiwGmABdUNYGtVBRNNyc'],
          ['BL1sqw2b26azLMYayAjJa1EUDXXUvbGjBNVMBcXDsV5nrsSTjFH'],
          ['BL2oH9eauAezMKnqMtiDNh78XLACRRftuNUzDcbSB4s3RpSCm3q'],
          ['BLLNPCBcxxLiTiuyKkDPbAgBANeiM4Dpf8YZVinh3Nd4xvL4tVa'],
          ['BMYiiMaLtrEafqdGU9Y5ypkWxqSLnHYf4WBEYNDd2WDccNJzyg3'],
          ['BM72nKrP8pDZjQq27abuocpBXK8vCK76e6JSrpncLguft9YJ58q'],
          ['BMZsrqFfdzJeRUDVCTKuHanQ6iub5ZMUW5751AhMUvfxzAEBEmU'],
          ['BLhoUJtLmAok6aMcTcetPXr1BHYT5LgKwFPyvTWvdjezYcH1T2X'],
          ['BLPrY2fsMh8X5W2XYXrWcFCNvDxVpawvp4NqmiJoPm8eerApLtQ'],
          ['BLytRtfeucnFFsLVnm5iYXMvCkcpJWtVr9z38p2FHGEHYZsbYuE'],
          ['BKqHk24Tqb4sgiAAh5ZZW3ADnWYpxbDTY68zLve5ykZmNPWqw3g'],
          ['BLPHyFDKagwK3uqtp3qNp8qh1SZkuc8AoWSv4rXkTvie4LsPiRq'],
          ['BM3Bm1nYZytL3agQCtiemWCc7dwCsgrK14gW36jcy58xihmm9s7'],
          ['BLawDheoX6uQuwfXCyTn216ohkN716AZncE2HCQdDtxQcZV5Rfq'],
          ['BM4SoEqYwPoX6XxGGP7ukt9RN1cKj5t6DoQEJnjrsug3NjwWZba'],
        ],
      },
    });
  }
}
