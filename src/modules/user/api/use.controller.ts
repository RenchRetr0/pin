import { Public } from '@common/decorators';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '@user/domain/dto';
import { ICreateUserUseCase } from '@user/domain/use-case/create';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        @Inject(ICreateUserUseCase)
        private readonly createUserUseCase: ICreateUserUseCase,
    ) {}

    @Post()
    @Public()
    @ApiOperation({ summary: 'Create a new user.' })
    @ApiResponse({
        status: 201,
        description: 'User created',
    })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({ status: 400, description: 'Invalid request' })
    async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
        await this.createUserUseCase.create(createUserDto);
    }
}
