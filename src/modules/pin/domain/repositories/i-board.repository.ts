import { CreateBoardDto } from '../dto/board';
import { BoardModel } from '../model';

export abstract class IBoardRepository {
    abstract findById(boardId: number): Promise<BoardModel | null>;
    abstract create(createBoardDto: CreateBoardDto): Promise<BoardModel>;
}
