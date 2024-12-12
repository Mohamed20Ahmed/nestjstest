import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../../services/Admins/users.service';
import { CreateUserDto } from '../../dtos/Admins/create-user.dto';
import { UpdateUserDto } from '../../dtos/Admins/update-user.dto';
import { Roles } from '../../../guards/role.decorator';
import { UsersGuard } from 'src/guards/users.guard';

@Controller('users')
@UseGuards(UsersGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(['admin', 'manager'])
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(['admin', 'manager'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Roles(['admin'])
  @Post()
  createUser(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createUserDto: CreateUserDto,
  ) {
    return this.usersService.createUser(createUserDto);
  }

  @Roles(['admin'])
  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Roles(['admin'])
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
