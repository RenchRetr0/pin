import { Provider } from '@nestjs/common';
import { ImageProviders } from './image';
import { BoardProviders } from './board';

export const UseCaseProviders: Provider[] = [
    ...ImageProviders,
    ...BoardProviders,
];
