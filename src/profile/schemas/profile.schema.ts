import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {ApiResponseProperty} from '@nestjs/swagger';
import { User } from 'src/user/schemas/user.schema';

export type ProfileDocument = Profile & mongoose.Document;

@Schema()
export class Profile 
{
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true})
    user: User;
    @ApiResponseProperty()
    @Prop({required: true})
    full_name: string;

    @ApiResponseProperty()
    @Prop({type: Date, default: Date.now()})
    created_at: Date;

    @ApiResponseProperty()
    @Prop({type: Date, default: Date.now()})
    updated_at: Date;

}

export const ProfileSchema = SchemaFactory.createForClass(Profile);