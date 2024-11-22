import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Controller('users')
export class UsersController {
  private users: UserEntity[] = [];

  @Get()
  find(): UserEntity[] {
    return this.users;
  }

  @Get(':id')
  findOne(@Param('id') id: string): UserEntity {
    return this.users.find((user) => user.id === id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): UserEntity {
    const newUser: UserEntity = { id: uuidv4(), ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex((user) => user.id === id);
    console.log(id);

    console.log(index);

    console.log(this.users[index]);

    this.users[index] = { ...this.users[index], ...updateUserDto };

    console.log(this.users[index]);

    return this.users[index];
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
