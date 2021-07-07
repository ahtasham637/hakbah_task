import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';


export class CreateProfileDto {
    @ApiProperty()
    @IsNotEmpty()
    full_name: string;
}
