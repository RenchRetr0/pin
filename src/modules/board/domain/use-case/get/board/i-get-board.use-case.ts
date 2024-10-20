import { BoardModel } from '@board/domain/model';

export abstract class IGetBoardUseCase {
    abstract getById(boardId: number): Promise<BoardModel>;
    abstract getByIdWithUser(
        boardId: number,
        userId: number,
    ): Promise<BoardModel>;
}
