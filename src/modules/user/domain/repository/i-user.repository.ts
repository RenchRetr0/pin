import { CreateUserDto } from '../dto';
import { UserModel } from '../model';

export abstract class IUserRepository {
    abstract findById(userId: number): Promise<UserModel | null>;
    abstract findByIdWithBoard(
        userId: number,
        boardId: number,
    ): Promise<UserModel | null>;
    abstract create(createUserDto: CreateUserDto): Promise<UserModel>;
    abstract update(userId: number, userModel: UserModel): Promise<void>;
}
