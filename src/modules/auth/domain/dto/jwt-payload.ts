import { ApiProperty } from '@nestjs/swagger';

export class JwtPayloadDto {
    @ApiProperty({
        example: 1,
    })
    userId: number;
}
