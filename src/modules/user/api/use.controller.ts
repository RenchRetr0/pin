import { Public } from "@common/decorators";
import { Body, Controller, Inject, Post } from "@nestjs/common";
import { CreateUserDto } from "@user/domain/dto";
import { ICreateUserUseCase } from "@user/domain/use-case/create";

@Controller('user')
export class UserController
{
    constructor(
        @Inject(ICreateUserUseCase)
        private readonly createUserUseCase: ICreateUserUseCase
    ){}

    @Post()
    @Public()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<void>
    {
        await this.createUserUseCase.create(createUserDto);
    }
}