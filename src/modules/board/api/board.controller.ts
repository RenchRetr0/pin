import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    ParseIntPipe,
    Post,
} from '@nestjs/common';
import { ICreateBoardUseCase } from '@board/domain/use-case/create';
import { GetCurrentUser } from '@common/decorators';
import { CreateBoardDto } from '@board/domain/dto';
import { IGetBoardsUseCase } from '@board/domain/use-case/get/boards';
import { BoardModel } from '@board/domain/model';
import { IGetBoardUseCase } from '@board/domain/use-case/get/board';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { JwtPayloadDto } from '@auth/domain/dto';

@ApiTags('Board')
@ApiBearerAuth()
@Controller('board')
export class BoardController {
    constructor(
        @Inject(ICreateBoardUseCase)
        private readonly createBoardUseCase: ICreateBoardUseCase,
        @Inject(IGetBoardsUseCase)
        private readonly getBoardsUseCase: IGetBoardsUseCase,
        @Inject(IGetBoardUseCase)
        private readonly getBoardUseCase: IGetBoardUseCase,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create a new board.' })
    @ApiResponse({
        status: 201,
        description: 'Board created',
    })
    @ApiBody({ type: CreateBoardDto })
    @ApiResponse({ status: 400, description: 'Invalid request' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async createBoard(
        @GetCurrentUser() userToken: JwtPayloadDto,
        @Body() createBoardDto: CreateBoardDto,
    ): Promise<void> {
        await this.createBoardUseCase.createBoard(
            userToken.userId,
            createBoardDto,
        );
    }

    @Get()
    @ApiOperation({ summary: 'Get all board' })
    @ApiResponse({
        status: 200,
        type: [BoardModel],
        description: 'Authentication was successful',
    })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async getAll(
        @GetCurrentUser() userToken: JwtPayloadDto,
    ): Promise<BoardModel[]> {
        return await this.getBoardsUseCase.getAllByUserId(userToken.userId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get one board' })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'Id board',
    })
    @ApiResponse({
        status: 200,
        type: BoardModel,
        description: 'Authentication was successful',
    })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async getById(
        @Param('id', ParseIntPipe) boardId: number,
    ): Promise<BoardModel> {
        return await this.getBoardUseCase.getById(boardId);
    }
}
