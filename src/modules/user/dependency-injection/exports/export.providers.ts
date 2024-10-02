import { Provider } from '@nestjs/common';
import { GetUserProvider, UpdateUserProvider } from '../domain/domain';

export const ExportProviders: Provider[] = [
    GetUserProvider,
    UpdateUserProvider,
];
