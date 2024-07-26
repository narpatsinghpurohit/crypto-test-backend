import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class RegisterDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail({}, { message: "Enter a valid email"})
    readonly email: string;

    @IsString()
    @MinLength(6, {message:'Enter atleast 6 characters'})   
    readonly password: string;
}