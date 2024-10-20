import { UserModel } from '../../model';

export abstract class IGetUserUseCase {
    abstract getById(userId: number): Promise<UserModel>;
    abstract getByIdWithBoard(
        userId: number,
        boardId: number,
    ): Promise<UserModel>;
}
