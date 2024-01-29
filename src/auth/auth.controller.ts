import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './dto/Login.dto';
import { SignUpDTO } from './dto/SignUp.dto';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiBody({ type: LoginDTO })
  @Post("/login")
  login(@Body() body: LoginDTO): Promise<any> {
    return this.authService.login(body);
  }

  @ApiBody({ type: SignUpDTO })
  @Post("sign-up")
  async signUp(@Body() body: SignUpDTO, @Res() res): Promise<any> {
    const data = await this.authService.signUp(body);
    res.status(data.status).send(data);
  }

}
