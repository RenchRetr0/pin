import { Inject, Injectable } from '@nestjs/common';
import { ICreateUserUseCase } from './i-create-user.use-case';
import { IUserRepository } from '../../repository';
import { CreateUserDto } from '../../dto';
import { UserBarRequest } from '@user/domain/error';
import { IGetUserUseCase } from '../get';

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
    constructor(
        @Inject(IUserRepository)
        private readonly userRepository: IUserRepository,
        @Inject(IGetUserUseCase)
        private readonly getUserUseCase: IGetUserUseCase,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<void> {
        const userModelByLoginExist = await this.getUserUseCase.getByLogin(
            createUserDto.login,
        );
        if (userModelByLoginExist)
            throw new UserBarRequest(
                `User with login: ${createUserDto.login} is exist.`,
            );
        try {
            await this.userRepository.create(createUserDto);
        } catch (error) {
            console.error(error.message);
            throw new UserBarRequest();
        }
    }
}
