import {ApiResponseProperty} from '@nestjs/swagger';

export class AuthResponseDto {
    @ApiResponseProperty()
    email: string;

    @ApiResponseProperty()
    full_name: string;

    @ApiResponseProperty()
    token: string;
}
