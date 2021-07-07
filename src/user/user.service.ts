import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userRepository: mongoose.Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser: UserDocument = new this.userRepository(createUserDto);
    return await newUser.save();
  }

  async update(userId: string, updateProfileDto: UpdateUserDto): Promise<UserDocument> {
    const user: UserDocument = await this.userRepository.findOneAndUpdate({_id: userId}, updateProfileDto).exec();

    return user;
  }

  async findOneByEmail(email: string): Promise<User>
  {
    const user: User = await this.userRepository.findOne({email}).exec();
    return user;
  }

  async findOne(userId: string): Promise<User>
  {
    const user: User = await this.userRepository.findOne({_id: userId}).exec();
    return user;
  }
}
