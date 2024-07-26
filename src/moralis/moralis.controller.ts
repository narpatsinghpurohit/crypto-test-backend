import { Controller, Get, Param } from '@nestjs/common';
import { MoralisService } from './moralis.service';

@Controller('moralis')
export class MoralisController {
    constructor(private moralisService:MoralisService){}

    @Get("/net-worth/:accountId")
    netWorth(@Param('accountId') accountId:string):Promise<any>{
        return this.moralisService.getNetWorth(accountId);
    }
}
