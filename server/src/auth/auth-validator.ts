import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class createUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
  @IsNotEmpty()
  fullname: string;
  @IsNotEmpty()
  username: string;
}
