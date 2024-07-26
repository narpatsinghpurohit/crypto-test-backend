import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import * as mongoos from 'mongoose';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: mongoos.Model<User>,
        private jwtService: JwtService
    ) { }

    async checkEmailAvailability(email: string) {
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }
    }

    async register(request: RegisterDto): Promise<{ token: string,data:{name:string, email:string} }> {
        const { name, email, password } = request;
        await this.checkEmailAvailability(request.email);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword
        });

        const token = this.jwtService.sign({ id: user._id });

        return { token, data:{name:user.name, email:user.email} };
    }

    async login(request: LoginDto): Promise<{ token: string, data:{name:string, email:string} }> {
        const { email, password } = request;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const token = this.jwtService.sign({ id: user._id });
        return { token, data:{name:user.name, email:user.email}};
    }
}
