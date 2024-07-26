import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Injectable()
export class CryptocompareService {
    constructor(private readonly httpService: HttpService) { }


    async getTopCurrencies(limit: number, currency: string){
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull';
        const params = {
            limit,
            tsym: currency,
            api_key:process.env.CRYPOCOMPARE_API_KEY
        };
        return (await this.httpService.axiosRef.get(url, { params })).data;
    }
    async getHistoricData(limit: number, currency: string, fsym: string){
        const url = 'https://min-api.cryptocompare.com/data/v2/histoday';
        const params = {
          fsym,
          tsym: currency,
          limit,
          api_key: process.env.CRYPOCOMPARE_API_KEY
        };
        return (await this.httpService.axiosRef.get(url, { params })).data;
      }
}
