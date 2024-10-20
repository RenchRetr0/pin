import { BoardModel } from '@board/domain/model';

export abstract class IGetBoardsUseCase {
    abstract getAllByUserId(userId: number): Promise<BoardModel[]>;
}
