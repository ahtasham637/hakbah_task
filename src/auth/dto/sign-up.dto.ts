import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsEmail} from 'class-validator';

export class SignUpDto {
    @ApiProperty()
    @IsNotEmpty() full_name: string;

    @ApiProperty()
    @IsEmail() email: string;

    @ApiProperty()
    @IsNotEmpty() password: string;

}
