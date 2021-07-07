import { Controller, Get, NotFoundException, Request, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Profile } from './schemas/profile.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Profile')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT') //swagger
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({summary: "Returns user profile"})
  @ApiOkResponse({type: Profile, description: "User Profile Object"})
  @Get()
  async getProfile(@Request() req: any): Promise<Profile> {
    const {userId} = req.user;
    const profile = this.profileService.getProfile(userId);

    if(!profile)
    {
      throw new NotFoundException();
    }

    return profile;
  }
}
