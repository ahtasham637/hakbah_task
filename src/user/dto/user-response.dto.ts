import {ApiResponseProperty} from '@nestjs/swagger';

export class UserResponseDto {
    @ApiResponseProperty()
    _id: string;

    @ApiResponseProperty()
    email: string;

    @ApiResponseProperty()
    created_at: Date;

    @ApiResponseProperty()
    updated_at: Date;
}
