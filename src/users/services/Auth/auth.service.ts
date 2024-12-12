import { Model } from 'mongoose';
import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { User } from '../../interfaces/user.interface';
import { SignInDto, SignUpDto } from '../../dtos/Auth/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.userModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Incorrect email or password');
    }

    const payload = {
      email: user.email,
      role: user.role,
    };

    const token = await this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });

    const response = { data: { user, token } };

    return response;
  }

  async signUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;

    let user = await this.userModel.findOne({ email });

    if (user) {
      throw new BadRequestException('this email is already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await this.userModel.create({
      ...signUpDto,
      role: 'user',
      password: hashedPassword,
    });

    const payload = {
      email: user.email,
      role: user.role,
    };

    const token = await this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });

    const response = { data: { user, token } };

    return response;
  }
}
