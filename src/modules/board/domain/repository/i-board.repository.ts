import { CreateBoardDto } from '../dto';
import { BoardModel } from '../model';

export abstract class IBoardRepository {
    abstract findById(boardId: number): Promise<BoardModel | null>;
    abstract findByIdWithUser(
        boardId: number,
        userId: number,
    ): Promise<BoardModel | null>;
    abstract findAllByUserId(userId: number): Promise<BoardModel[]>;
    abstract create(createBoardDto: CreateBoardDto): Promise<BoardModel>;
}
