import { Provider } from '@nestjs/common';
import {
    ICreateUserUseCase,
    CreateUserUseCase,
} from '@user/domain/use-case/create';

export const CreateUserProvider: Provider = {
    provide: ICreateUserUseCase,
    useClass: CreateUserUseCase,
};
