import { Provider } from '@nestjs/common';
import { ImageProviders } from './image';
import { PinProviders } from './pin';

export const UseCaseProviders: Provider[] = [
    ...ImageProviders,
    ...PinProviders,
];
