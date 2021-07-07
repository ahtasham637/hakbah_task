import { Controller, Get, Post, Body, Request, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto} from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto } from './dto/change-password.dto';
import { User } from 'src/user/schemas/user.schema';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserResponseDto } from 'src/user/dto/user-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({description: "Signup new user"})
  @ApiCreatedResponse({type: AuthResponseDto, description: "Auth Response Object"})
  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto): Promise<AuthResponseDto> {
    return this.authService.signup(signUpDto);
  }

  @ApiOperation({description: "Login user"})
  @ApiCreatedResponse({type: AuthResponseDto, description: "Auth Response Object"})
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT') //swagger
  @ApiOperation({description: "Change password user"})
  @ApiCreatedResponse({type: AuthResponseDto, description: "Auth Response Object"})
  @Put('password/change')
  async changePassword(@Request() req: any, @Body() changePasswordDto: ChangePasswordDto): Promise<UserResponseDto> {
    const {userId} = req.user;
    return this.authService.changePassword(userId, changePasswordDto);
  }
}
