import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decoretor';
import { User } from './user.entity';

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
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialDto);
  }

  @Post('/auth')
  @UseGuards(AuthGuard())
  tokenCheck(@GetUser()user: User) {
  console.log(user);
  }
}
