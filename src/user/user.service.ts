import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.user.create(createUserDto);

    return await this.user.save(newUser);
  }

  async findAll() {
    const users = await this.user.find();
    return { data: users, count: users.length };
  }

  async findOne(id) {
    const user = await this.user.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  async update(id, updateUserDto: UpdateUserDto) {
    const user = await this.user.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return await this.user.save({ ...user, ...updateUserDto });
  }

  async remove(id) {
    const user = await this.user.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return await this.user.delete(id);
  }
}
