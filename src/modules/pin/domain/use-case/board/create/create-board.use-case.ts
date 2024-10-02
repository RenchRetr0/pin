import { Inject, Injectable } from '@nestjs/common';
import { ICreateBoardUseCase } from './i-create-board.use-case';
import { IBoardRepository } from '@pin/domain/repositories';
import { CreateBoardDto } from '@pin/domain/dto/board';
import { BoardPinModel } from '@pin/domain/model';
import { IGetUserUseCase } from '@user/domain/use-case/get';

@Injectable()
export class CreateBoardUseCase implements ICreateBoardUseCase {
    constructor(
        @Inject(IBoardRepository)
        private readonly boardRepository: IBoardRepository,
        @Inject(IGetUserUseCase)
        private readonly getUserUseCase: IGetUserUseCase,
    ) {}

    async create(
        userId: number,
        createBoardDto: CreateBoardDto,
    ): Promise<void> {
        (createBoardDto.userId = userId),
            (createBoardDto.privacy = createBoardDto.privacy ?? 'PUBLIC');
        createBoardDto.boardId = (await this.createBoardPin(createBoardDto)).id;
        try {
            await this.boardRepository.create(createBoardDto);
        } catch (error) {
            console.error(error);
        }
    }

    private async createBoardPin(
        createBoardDto: CreateBoardDto,
    ): Promise<BoardPinModel> {
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
                'https://api-sandbox.pinterest.com/v5/boards',
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
