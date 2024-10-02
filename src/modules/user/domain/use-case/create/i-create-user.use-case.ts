import { CreateUserDto } from '../../dto';

export abstract class ICreateUserUseCase {
    abstract create(createUserDto: CreateUserDto): Promise<void>;
}
