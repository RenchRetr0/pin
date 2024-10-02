import { Provider } from '@nestjs/common';
import { CreateUserProvider } from './create-user.provider';
import { GetUserProvider } from './get-user.provider';
import { UpdateUserProvider } from './update-user.provider';

export const UserProviders: Provider[] = [
    CreateUserProvider,
    GetUserProvider,
    UpdateUserProvider,
];
