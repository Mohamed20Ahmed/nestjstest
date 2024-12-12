import { Module } from '@nestjs/common';
import { UsersController } from './controllers/Admins/users.controller';
import { UsersService } from './services/Admins/users.service';
import { usersProviders } from './providers/user.providers';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/Auth/auth.controller';
import { AuthService } from './services/Auth/auth.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    DatabaseModule,
  ],
  controllers: [UsersController, AuthController],
  providers: [...usersProviders, UsersService, AuthService],
})
export class UsersModule {}
