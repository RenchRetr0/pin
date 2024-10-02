import { Inject, Injectable } from '@nestjs/common';
import { IGetUserUseCase } from './i-get-user.use-case';
import { UserModel } from '@user/domain/model';
import { IUserRepository } from '@user/domain/repository';

@Injectable()
export class GetUserUseCase implements IGetUserUseCase {
    constructor(
        @Inject(IUserRepository)
        private readonly userRepository: IUserRepository,
    ) {}

    async getById(userId: number): Promise<UserModel | null> {
        const userModel = await this.userRepository.findById(userId);
        if (!userModel) {
            console.log(null);
            return null;
        } else return userModel;
    }
}
