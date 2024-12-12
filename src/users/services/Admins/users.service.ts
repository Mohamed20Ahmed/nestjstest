import { Model } from 'mongoose';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { User } from '../../interfaces/user.interface';
import { CreateUserDto } from '../../dtos/Admins/create-user.dto';
import { UpdateUserDto } from '../../dtos/Admins/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  async findAll(): Promise<{ data: User[]; count: number; status: number }> {
    const users = await this.userModel.find().select('-password -__v');
    return { data: users, count: users.length, status: 200 };
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create(createUserDto);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userModel.findByIdAndDelete(id);
    console.log(user);

    if (!user) {
      throw new NotFoundException();
    }
  }
}
