import { Inject, Injectable } from '@nestjs/common';
import { ICreateBoardUseCase } from './i-create-board.use-case';
import { IBoardRepository } from '@board/domain/repository';
import { CreateBoardDto } from '@board/domain/dto';
import { IGetUserUseCase } from '@user/domain/use-case/get';
import { BoardBarRequest } from '@board/domain/errors';
import { BoardResponseModel } from '@board/domain/model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CreateBoardUseCase implements ICreateBoardUseCase {
    constructor(
        @Inject(IBoardRepository)
        private readonly boardRepository: IBoardRepository,
        @Inject(IGetUserUseCase)
        private readonly getUserUseCase: IGetUserUseCase,
        @Inject(ConfigService)
        private readonly configService: ConfigService,
    ) {}

    async createBoard(
        userId: number,
        createBoardDto: CreateBoardDto,
    ): Promise<void> {
        await this.getUserUseCase.getById(userId);
        try {
            createBoardDto.userId = userId;
            createBoardDto.privacy = createBoardDto.privacy ?? 'PUBLIC';
            const boardResponseModel = await this.createBoardInPin(
                createBoardDto,
            );
            createBoardDto.boardId = boardResponseModel.id;
            await this.boardRepository.create(createBoardDto);
        } catch (error) {
            console.error(error.message);
            throw new BoardBarRequest();
        }
    }

    private async createBoardInPin(
        createBoardDto: CreateBoardDto,
    ): Promise<BoardResponseModel> {
        try {
            const userModel = await this.getUserUseCase.getById(
                createBoardDto.userId,
            );
            const bodyString = {
                name: createBoardDto.name,
                description: createBoardDto.description ?? null,
                privacy: createBoardDto.privacy ?? 'PUBLIC',
            };
            const result = await fetch(
                `${this.configService.get<string>('PINTDOMAIN')}/boards`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userModel.accessToken}`,
                    },
                    body: JSON.stringify(bodyString),
                },
            );
            return result.json();
        } catch (error) {
            console.error(error);
        }
    }
}
