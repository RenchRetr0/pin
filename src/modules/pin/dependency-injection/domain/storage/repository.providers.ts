import { Provider } from '@nestjs/common';
import { ImageProvider } from './image.provider';
import { BoardProvider } from './board.provider';

export const RepositoryProviders: Provider[] = [ImageProvider, BoardProvider];
