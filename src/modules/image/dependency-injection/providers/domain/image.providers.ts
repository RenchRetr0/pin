import { Provider } from '@nestjs/common';
import { CreateImageProvider } from './create';
import { GetImageProvider, GetImagesProvider } from './get';
import { UpdateImageProvider } from './update';
import { RequestPinProvider } from './request-pin';
import { ValidateTimeProvider } from './validate-time';
import { SendImageProvider } from './send-image';

export const ImageProviders: Provider[] = [
    CreateImageProvider,
    GetImageProvider,
    GetImagesProvider,
    UpdateImageProvider,
    RequestPinProvider,
    ValidateTimeProvider,
    SendImageProvider,
];
