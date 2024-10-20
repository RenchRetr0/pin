import { Inject, Injectable } from '@nestjs/common';
import { IGetBoardUseCase } from './i-get-board.use-case';
import { IBoardRepository } from '@board/domain/repository';
import { BoardModel } from '@board/domain/model';
import { BoardNotFound } from '@board/domain/errors';

@Injectable()
export class GetBoardUseCase implements IGetBoardUseCase {
    constructor(
        @Inject(IBoardRepository)
        private readonly boardRepository: IBoardRepository,
    ) {}

    async getById(boardId: number): Promise<BoardModel> {
        const boardModel = await this.boardRepository.findById(boardId);
        if (!boardModel) throw new BoardNotFound();
        else return boardModel;
    }

    async getByIdWithUser(
        boardId: number,
        userId: number,
    ): Promise<BoardModel> {
        const boardModel = await this.boardRepository.findByIdWithUser(
            boardId,
            userId,
        );
        if (!boardModel) throw new BoardNotFound();
        else return boardModel;
    }
}
