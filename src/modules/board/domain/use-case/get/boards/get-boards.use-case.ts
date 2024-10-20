import { Inject, Injectable } from '@nestjs/common';
import { IGetBoardsUseCase } from './i-get-boards.use-case';
import { IBoardRepository } from '@board/domain/repository';
import { BoardModel } from '@board/domain/model';

@Injectable()
export class GetBoardsUseCase implements IGetBoardsUseCase {
    constructor(
        @Inject(IBoardRepository)
        private readonly boardRepository: IBoardRepository,
    ) {}

    async getAllByUserId(userId: number): Promise<BoardModel[]> {
        return await this.boardRepository.findAllByUserId(userId);
    }
}
