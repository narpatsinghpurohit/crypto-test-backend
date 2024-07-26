import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './schemas/users.schema';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @Post("/login")
    login(@Body() request:LoginDto):Promise<{token:string,data:{name:string, email:string}}>{
        return this.authService.login(request);
    }

    @Post("/register")
    register(@Body() request:RegisterDto):Promise<{token:string,data:{name:string, email:string}}>{
        return this.authService.register(request);
    }
}
