import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {ApiResponseProperty} from '@nestjs/swagger';
import {Exclude} from 'class-transformer';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
    @ApiResponseProperty()
    @Prop({required: true}) email: string;

    @Exclude()
    @Prop({required: true})
    password: string;

    @ApiResponseProperty()
    @Prop({type: Date, default: Date.now()})
    created_at: Date;

    @ApiResponseProperty()
    @Prop({type: Date, default: Date.now()})
    updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);