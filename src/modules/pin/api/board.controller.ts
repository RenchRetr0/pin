import { JwtPayloadDto } from '@auth/domain/dto';
import { GetCurrentUser } from '@common/decorators';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateBoardDto } from '@pin/domain/dto/board';
import { ICreateBoardUseCase } from '@pin/domain/use-case/board/create';

@Controller('board')
export class BoardController {
    constructor(
        @Inject(ICreateBoardUseCase)
        private readonly createBoardUseCase: ICreateBoardUseCase,
    ) {}

    @Post()
    async createBoard(
        @GetCurrentUser() userToken: JwtPayloadDto,
        @Body() createBoardDto: CreateBoardDto,
    ): Promise<void> {
        await this.createBoardUseCase.create(userToken.userId, createBoardDto);
    }
}
