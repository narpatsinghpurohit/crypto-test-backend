import { Controller, Get, Query } from '@nestjs/common';
import { CryptocompareService } from './cryptocompare.service';

@Controller('cryptocompare')
export class CryptocompareController {

    constructor(private cryptoCompareService: CryptocompareService) { }

    @Get("/top-currencies")
    getTopCurrencies(
        @Query('limit') limit: number = 10,
        @Query('currency') currency: string = 'USD',
    ) {
        return this.cryptoCompareService.getTopCurrencies(limit, currency);
    }

    @Get("/historic-data")
    getHistoricData(
        @Query('limit') limit: number = 10,
        @Query('currency') currency: string = 'USD',
        @Query('fsym') fsym: string = 'BTC',
    ) {
        return this.cryptoCompareService.getHistoricData(limit, currency, fsym);
    }
}
