import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UserService } from 'src/user/user.service';
import { ProfileService } from 'src/profile/profile.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
import { Profile } from 'src/profile/schemas/profile.schema';
import {JwtService} from '@nestjs/jwt';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserResponseDto } from 'src/user/dto/user-response.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
    private readonly jwtService: JwtService
  ) { }

  async signup(signUpDto: SignUpDto): Promise<AuthResponseDto>
  {
    const {email, password, full_name} = signUpDto;
    const userExists = await this.userService.findOneByEmail(email);

    if(userExists)
    {
      throw new BadRequestException("Account already exists");
    }

    const hashedPassword = await this.createHash(password);

    const createUserDto: CreateUserDto = {email, password: hashedPassword};

    const user: User = await this.userService.create(createUserDto);
    
    const createProfileDto: CreateProfileDto = {full_name}; 

    const profile: Profile = await this.profileService.create(user['_id'], createProfileDto);

    const result: AuthResponseDto = this.getAuthUserResponse(user, profile);

    return result;
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto>
  {
    const {email, password} = loginDto;

    const user: User = await this.userService.findOneByEmail(email);

    if(!user)
    {
      throw new NotFoundException("User not found");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if(!isPasswordMatched)
    {
      throw new BadRequestException("The password you have entered is incorrect");
    }

    const profile: Profile = await this.profileService.getProfile(user['_id']);

    const result: AuthResponseDto = this.getAuthUserResponse(user, profile);

    return result;
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<UserResponseDto>
  {
    const {current_password, new_password} = changePasswordDto;
    const user: User = await this.userService.findOne(userId);

    if(!user)
    {
      throw new NotFoundException("The user was not found");
    }

    const isPasswordMatched = await bcrypt.compare(current_password, user.password);

    if(!isPasswordMatched)
    {
      throw new BadRequestException("The password you have entered is incorrect");
    }

    const hashedPassword = await this.createHash(new_password);

    const updateUserDto: UpdateUserDto = {password: hashedPassword};

    const updateUser = await this.userService.update(user['_id'], updateUserDto);

    const result: UserResponseDto = this.getUserResponse(updateUser);

    return result;
  }

  private async createHash(password: string): Promise<string>
  {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private getUserResponse(user: UserDocument): UserResponseDto
  {
    const {email, created_at, _id, updated_at} = user;

    return {_id, email, created_at, updated_at};
  }

  private getAuthUserResponse(user: User, profile?: Profile): AuthResponseDto
  {
    const {email, created_at} = user;
    const token = this.createToken(user['_id']);

    const {full_name} = profile;

    const result: AuthResponseDto = {email, full_name, token};

    return result;
  }

  private createToken(userId: string): string
  {
    const payload = {sub: userId};
    return this.jwtService.sign(payload);
  }
}
