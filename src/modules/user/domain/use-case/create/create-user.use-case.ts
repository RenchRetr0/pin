import { Inject, Injectable } from '@nestjs/common';
import { ICreateUserUseCase } from './i-create-user.use-case';
import { IUserRepository } from '../../repository';
import { CreateUserDto } from '../../dto';

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
    constructor(
        @Inject(IUserRepository)
        private readonly userRepository: IUserRepository,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<void> {
        try {
            await this.userRepository.create(createUserDto);
        } catch (error) {
            console.error(error.message);
        }
    }
}
