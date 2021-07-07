import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile, ProfileDocument } from './schemas/profile.schema';

@Injectable()
export class ProfileService {

  constructor(
    @InjectModel(Profile.name) private readonly profileRepository: mongoose.Model<Profile>
    ) {}

  async create(userId: string, createProfileDto: CreateProfileDto): Promise<Profile> {
    const saveObject = {user: userId, ...createProfileDto};

    const profileDocument: ProfileDocument = new this.profileRepository(saveObject);
    return await profileDocument.save();
  }

  async getProfile(userId: string): Promise<Profile>
  {
    const profile: Profile = await this.profileRepository.findOne({user: userId} as mongoose.FilterQuery<User>)
      .populate('user', 'email created_at updated_at')
      .exec();

    return profile;
  }
}
