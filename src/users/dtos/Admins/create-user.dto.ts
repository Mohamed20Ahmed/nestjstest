import { IsIn, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsNumber()
  age: number;

  @IsString()
  @IsIn(['admin', 'manager'])
  role: string;
}
