import { Provider } from '@nestjs/common';
import { IImageRepository } from '@pin/domain/repositories';
import { ImageRepository } from '@pin/storages/repositories';

export const ImageProvider: Provider = {
    provide: IImageRepository,
    useClass: ImageRepository,
};
