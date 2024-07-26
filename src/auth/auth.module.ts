import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User, UserSchema } from 'src/auth/schemas/users.schema';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory:(config:ConfigService) => ({
        global:true,
        secret:config.get<string>("JWT_SECRET"),
        signOptions:{
          expiresIn:config.get<string | number>("JWT_EXPIRATION_TIME")
        }
      })
    }),
    MongooseModule.forFeature([{name:User.name, schema:UserSchema}])
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
