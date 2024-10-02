import { IsNotEmpty, IsString } from "class-validator";

export class authBodyDto
{
    @IsNotEmpty()
    @IsString()
    code!: string;
}