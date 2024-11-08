import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class authBodyDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'fa6d1b73e90eadb8f1e2935ad0d0d5a037c6ab70'})
    code!: string;
}
