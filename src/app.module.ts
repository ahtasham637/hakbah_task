import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), MongooseModule.forRoot(`mongodb://${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`, {retryWrites: false, useFindAndModify: false}), UserModule, ProfileModule, AuthModule],
  controllers: [],
  providers: []
})
export class AppModule {}
