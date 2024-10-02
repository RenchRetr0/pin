import { Provider } from '@nestjs/common';
import { IUserRepository } from 'src/modules/user/domain/repository';
import { UserRepository } from 'src/modules/user/storages/repository';

export const RepositoryProvider: Provider = {
    provide: IUserRepository,
    useClass: UserRepository,
};
