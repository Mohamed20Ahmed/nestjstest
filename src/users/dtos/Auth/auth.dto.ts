import {
  IsEmail,
  IsString,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}

export class SignUpDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsNumber()
  age: number;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
