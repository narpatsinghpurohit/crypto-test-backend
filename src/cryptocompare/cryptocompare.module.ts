import { Module } from '@nestjs/common';
import { CryptocompareService } from './cryptocompare.service';
import { CryptocompareController } from './cryptocompare.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[HttpModule],
  providers: [CryptocompareService],
  controllers: [CryptocompareController]
})
export class CryptocompareModule {}
