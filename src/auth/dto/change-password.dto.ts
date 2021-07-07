import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsEmail} from 'class-validator';

export class ChangePasswordDto {
    @ApiProperty()
    @IsNotEmpty() current_password: string;

    @ApiProperty()
    @IsNotEmpty() new_password: string;
}
