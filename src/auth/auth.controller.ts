import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/singup')
  singUp(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<void> {
    return this.authService.singUp(authCredentialDto);
  }

  @Post('/singin')
  singIn(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<string> {
    return this.authService.signIn(authCredentialDto);
  }
}
