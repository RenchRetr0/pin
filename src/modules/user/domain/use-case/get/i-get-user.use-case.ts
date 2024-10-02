import { UserModel } from '../../model';

export abstract class IGetUserUseCase {
    abstract getById(userId: number): Promise<UserModel | null>;
}
