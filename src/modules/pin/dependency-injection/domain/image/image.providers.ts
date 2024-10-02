import { Provider } from '@nestjs/common';
import { CreateImageProvider } from './create';
import { GetImageProvider } from './get';

export const ImageProviders: Provider[] = [
    CreateImageProvider,
    GetImageProvider,
];
