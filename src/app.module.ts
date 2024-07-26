import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { MoralisModule } from './moralis/moralis.module';
import { CryptocompareModule } from './cryptocompare/cryptocompare.module';

//  `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:${process.env.DB_PORT}`; //local
// `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mongo:${process.env.DB_PORT}`; //docker

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:".env",
      isGlobal:true
    }),
    MongooseModule.forRoot(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:${process.env.DB_PORT}`),
    AuthModule,
    MoralisModule,
    CryptocompareModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
