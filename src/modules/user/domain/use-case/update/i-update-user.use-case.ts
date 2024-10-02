import { UpdateUserDto } from '@user/domain/dto';

export abstract class IUpdateUserUseCase {
    abstract update(
        userId: number,
        updateUserDto: UpdateUserDto,
    ): Promise<void>;
}
