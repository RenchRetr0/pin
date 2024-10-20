import { Provider } from '@nestjs/common';
import { CreateBoardProvider } from './create';
import { GetBoardProvider, GetBoardsProvider } from './get';

export const BoardProviders: Provider[] = [
    CreateBoardProvider,
    GetBoardProvider,
    GetBoardsProvider,
];
