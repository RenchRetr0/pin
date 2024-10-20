import { Inject, Injectable } from '@nestjs/common';
import { IGetUserUseCase } from './i-get-user.use-case';
import { UserModel } from '@user/domain/model';
import { IUserRepository } from '@user/domain/repository';
import { UserNotFound } from '@user/domain/error';

@Injectable()
export class GetUserUseCase implements IGetUserUseCase {
    constructor(
        @Inject(IUserRepository)
        private readonly userRepository: IUserRepository,
    ) {}

    async getById(userId: number): Promise<UserModel> {
        const userModel = await this.userRepository.findById(userId);
        if (!userModel) throw new UserNotFound();
        else return userModel;
    }

    async getByIdWithBoard(
        userId: number,
        boardId: number,
    ): Promise<UserModel> {
        const userModel = await this.userRepository.findByIdWithBoard(
            userId,
            boardId,
        );
        if (!userModel) throw new UserNotFound();
        else return userModel;
    }
}
