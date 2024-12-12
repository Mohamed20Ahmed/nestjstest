import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../../services/Auth/auth.service';
import { SignInDto, SignUpDto } from '../../dtos/Auth/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  signIn(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    signInDto: SignInDto,
  ) {
    return this.authService.signIn(signInDto);
  }

  @Post('/sign-up')
  signUp(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    signUpDto: SignUpDto,
  ) {
    return this.authService.signUp(signUpDto);
  }
}
